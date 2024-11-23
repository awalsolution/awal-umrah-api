import { DateTime } from 'luxon'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { BaseController } from '#controllers/base_controller'
import BookingMemberDetail from '#models/tenant/booking_member_detail'
import Booking from '#models/tenant/booking'
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

      logger.info('Bookings All Records find successfully!')

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

  async show({ request, response }: HttpContext) {
    try {
      const DQ = await Booking.query()
        .where('id', request.param('id'))
        .preload('agency')
        .preload('members', (q) => {
          q.preload('hotelDetails', (subq) => {
            subq.preload('bed').preload('hotel').preload('room')
          })
        })
        .preload('bookingHotelDetails')
        .first()

      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Record Not Found',
        })
      }

      logger.info(`Bookings with id: ${DQ.id} find successfully!`)

      return response.ok({
        code: 200,
        message: 'Booking Find Successfully',
        data: DQ.serialize(),
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
      let booking = new Booking()
      booking.userId = user.id
      booking.agencyId = user.agency_id ?? null
      booking.customer_name = data.customer_name
      booking.status = data.status
      booking.group_no = data.group_no
      booking.group_name = data.group_name
      booking.category = data.category
      booking.arrival_date = DateTime.fromJSDate(new Date(data.arrival_date))
      booking.expected_departure = DateTime.fromJSDate(new Date(data.expected_departure))
      await booking.save()

      logger.info(`Bookings with id: ${booking.id} created successfully!`)

      return response.ok({
        code: 200,
        message: 'Operation Successfully',
        data: booking.serialize(),
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
      console.log(request.param('id'));
      await this.mapBooking(request.param('id'), data)

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

  async mapBooking(bookingId, data: any) {
    let booking:any = await Booking.query().where('id', bookingId).first()
    if (!booking) {
      return false
    }
    if (data.type === 'general') {
      booking.customer_name = data.customer_name
      booking.status = data.status
      booking.group_no = data.group_no
      booking.group_name = data.group_name
      booking.category = data.category
      booking.arrival_date = DateTime.fromJSDate(new Date(data.arrival_date))
      booking.expected_departure = DateTime.fromJSDate(new Date(data.expected_departure))
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
        const member = data
        delete member.type
        delete member.hotelDetails
        if (member.id) {
          await booking.related('members').updateOrCreate({ id: member.id }, member)
        } else {
          await booking.related('members').create(member)
        }
    } else if (data.type === 'hotel') {
      delete data.type
      const member = await BookingMemberDetail.query().where('id', data.booking_member_detail_id).first()
      if (member) {
        if (data.id) {
          await member.related('hotelDetails').updateOrCreate({}, data)
        } else {
          await member.related('hotelDetails').create(data)
        }
        await this.updateBedStatus(data.bed_id, 'booked')
      }
    } else if (data.type === 'booking hotel') {
        const bookingHotel = data
        delete bookingHotel.type
        if (bookingHotel.id) {
          await booking.related('bookingHotelDetails').updateOrCreate({}, bookingHotel)
        } else {
          await booking.related('bookingHotelDetails').create(bookingHotel)
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