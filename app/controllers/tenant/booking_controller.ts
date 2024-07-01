import { DateTime } from 'luxon'
import { HttpContext } from '@adonisjs/core/http'
import { BaseController } from '#controllers/base_controller'
import Booking from '#models/tenant/booking'
import logger from '@adonisjs/core/services/logger'
import BookingMemberDetail from '#models/tenant/booking_member_detail'
import Bed from '#models/tenant/bed'

export default class BookingController extends BaseController {
  async index({ request, response }: HttpContext) {
    try {
      let DQ = Booking.query()

      const page = request.input('page')
      const perPage = request.input('perPage')

      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Record Not Found',
        })
      }

      let data

      if (perPage) {
        data = await DQ.paginate(page, perPage)
      } else {
        data = await DQ.select('*')
      }

      logger.error('Bookings All Records find successfully!')

      return response.ok({
        code: 200,
        message: 'Record find Successfully',
        data: data,
      })
    } catch (e) {
      logger.error('something went wrong', e.toString())
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }

  async create({ auth, request, response }: HttpContext) {
    try {
      const data = request.body()
      const user = auth.user!
      const res = await this.mapBooking(null, data, user)

      logger.info(`Bookings with id: ${res.id} created successfully!`)

      return response.ok({
        code: 200,
        message: 'Operation Successfully',
        result: res,
      })
    } catch (e) {
      logger.error('something went wrong', e.toString())
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }
  async update({ request, response }: HttpContext) {
    try {
      const data = request.body()
      await this.mapBooking(request.param('id'), data, null)

      logger.info(`Booking with id:${request.param('id')} updated Successfully!`)

      return response.ok({
        code: 200,
        message: 'Booking updated Successfully!',
      })
    } catch (e) {
      logger.error('something went wrong', e.toString())
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }

  async mapBooking(id = null, data: any, user: any) {
    let booking: any
    if (id) {
      booking = await Booking.query().where('id', id).first()
      if (!booking) {
        return false
      }
    } else {
      booking = new Booking()
      if (user && !this.isSuperAdmin(user)) {
        booking.user_id = user.id
        booking.companyId = user.companyId
      }
    }

    if (data.type === 'general' || !id) {
      booking.customer_name = data.customer_name
      booking.status = data.status
      booking.group_no = data.group_no
      booking.group_name = data.group_name
      booking.category = data.category
      booking.arrival_date = DateTime.fromJSDate(new Date(data.arrival_date))
      booking.expected_departure = DateTime.fromJSDate(new Date(data.expected_departure))
      booking.confirmed_ticket = data.confirmed_ticket
      await booking.save()
    } else if (data.type === 'member') {
      if (data.dob instanceof Date) {
        data.dob = DateTime.fromJSDate(new Date(data.dob))
      } else if (typeof data.dob === 'number') {
        data.dob = DateTime.fromJSDate(new Date(data.dob))
      }
      if (data.issue_date instanceof Date) {
        data.issue_date = DateTime.fromJSDate(new Date(data.issue_date))
      } else if (typeof data.issue_date === 'number') {
        data.issue_date = DateTime.fromJSDate(new Date(data.issue_date))
      }
      if (data.expiry_date instanceof Date) {
        data.expiry_date = DateTime.fromJSDate(new Date(data.expiry_date))
      } else if (typeof data.expiry_date === 'number') {
        data.expiry_date = DateTime.fromJSDate(new Date(data.expiry_date))
      }
      if (id) {
        const member = data
        delete member.type
        if (member.id) {
          await booking.related('members').updateOrCreate({}, member)
        } else {
          await booking.related('members').create(member)
        }
      }
    } else if (data.type === 'hotel') {
      delete data.type
      const member = await BookingMemberDetail.query().where('id', id).first()
      if (member) {
        if (data.id) {
          await member.related('hotelDetails').updateOrCreate({}, data)
        } else {
          await member.related('hotelDetails').create(data)
        }
        await this.updateBedStatus(data.bed_id, 'booked')
      }
    } else if (data.type === 'booking hotel') {
      if (id) {
        const bookingHotel = data
        delete bookingHotel.type
        if (bookingHotel.id) {
          await booking.related('bookingHotelDetails').updateOrCreate({}, bookingHotel)
        } else {
          await booking.related('bookingHotelDetails').create(bookingHotel)
        }
      }
    }
    return booking
  }

  async updateBedStatus(id: number, status = 'available') {
    const data = { status: status }
    const bed = await Bed.findOrFail(id)
    bed.merge(data)
    await bed.save()
  }

  async destroy({ request, response }: HttpContext) {
    try {
      const DQ = await Booking.findBy('id', request.param('id'))
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data not found',
        })
      }
      await DQ.delete()

      logger.info(`Booking with id: ${DQ.id} deleted successfully!`)

      return response.ok({
        code: 200,
        message: 'Deleted successfully!',
      })
    } catch (e) {
      logger.error('something went wrong', e.toString())
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }
}
