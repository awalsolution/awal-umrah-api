import { HttpContext } from '@adonisjs/core/http'
import { BaseController } from '#controllers/base_controller'
import logger from '@adonisjs/core/services/logger'
import Booking from '#models/tenant/booking'

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
        data = await DQ.preload('agency').paginate(page, perPage)
      } else {
        data = await DQ.select('*')
      }

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
      const DQ = await Booking.query().where('id', request.param('id')).preload('agency').first()

      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Record Not Found',
        })
      }

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
      const currentUser = auth.user!

      let booking = new Booking()

      booking.userId = currentUser.id
      booking.agencyId = request.body().agency_id
      booking.status = request.body().status
      booking.group_name = request.body().group_name
      booking.arrival_date = request.body().arrival_date
      booking.departure_date = request.body().departure_date

      await booking.save()

      logger.info(`Bookings with id: ${booking.id} created successfully!`)

      return response.ok({
        code: 200,
        message: 'Created successfully!',
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

  async update({ auth, request, response }: HttpContext) {
    try {
      const currentUser = auth.user!
      const DQ = await Booking.query().where('id', request.param('id')).first()
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data not found',
        })
      }

      DQ.userId = currentUser.id
      DQ.agencyId = request.body().agency_id
      DQ.status = request.body().status
      DQ.group_name = request.body().group_name
      DQ.arrival_date = request.body().arrival_date
      DQ.departure_date = request.body().departure_date

      await DQ.save()
      logger.info(`Booking with id:${request.param('id')} updated Successfully!`)

      return response.ok({
        code: 200,
        message: 'Updated Successfully!',
      })
    } catch (e) {
      logger.error('something went wrong', e.toString())
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
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
