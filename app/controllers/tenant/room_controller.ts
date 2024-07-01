import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { BaseController } from '#controllers/base_controller'
import Room from '#models/tenant/room'

export default class RoomController extends BaseController {
  async index({ request, response }: HttpContext) {
    try {
      let DQ = Room.query()

      const page = request.input('page')
      const perPage = request.input('perPage')

      if (request.input('name')) {
        DQ = DQ.whereILike('room_no', request.input('name') + '%')
      }

      if (request.input('hotel_id')) {
        DQ = DQ.where('hotel_id', request.input('hotel_id'))
      }

      if (request.input('status')) {
        DQ = DQ.where('status', request.input('status'))
      }

      if (request.input('room_type')) {
        DQ = DQ.whereILike('room_type', request.input('room_type') + '%')
      }

      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Record Not Found',
        })
      }

      let data

      if (perPage) {
        data = await DQ.preload('hotels').preload('beds').paginate(page, perPage)
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
      const DQ = await Room.query().where('id', request.param('id')).preload('hotels').first()

      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }

      return response.ok({
        code: 200,
        message: 'Record find successfully!',
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

  async create({ request, response }: HttpContext) {
    try {
      const DE = await Room.query()
        .where('room_no', request.body().room_no)
        .where('hotel_id', request.body().hotel_id)
        .first()

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Room already exists!',
        })
      }

      const DM = new Room()

      DM.hotelId = request.body().hotel_id
      DM.status = request.body().status
      DM.room_type = request.body().room_type
      DM.room_no = request.body().room_no
      DM.floor_no = request.body().floor_no
      DM.price_type = request.body().price_type
      DM.purchase_price = request.body().purchase_price
      DM.sale_price = request.body().sale_price
      DM.no_of_bed = request.body().no_of_bed

      const DQ = await DM.save()
      logger.info(`Room with id:${DQ.id} Created Successfully!`)

      for (let i = 1; i <= request.body().no_of_bed; i++) {
        const bed = await DM.related('beds').create({
          name: request.body().floor_no + '-' + request.body().room_no + '-' + 'B' + i,
        })

        logger.info(`Bed with id:${bed.id} Created Successfully!`)
      }

      return response.ok({
        code: 200,
        message: 'Created successfully!',
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

  async update({ request, response }: HttpContext) {
    try {
      const DQ = await Room.findBy('id', request.param('id'))
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }

      const DE = await Room.query()
        .where('room_no', 'like', request.body().room_no)
        .whereNot('id', request.param('id'))
        .first()

      if (DE) {
        return response.conflict({
          code: 409,
          message: `Room: ${request.body().room_no} already exist!`,
        })
      }

      DQ.status = request.body().status
      DQ.room_type = request.body().room_type
      DQ.room_no = request.body().room_no
      DQ.floor_no = request.body().floor_no
      DQ.price_type = request.body().price_type
      DQ.purchase_price = request.body().purchase_price
      DQ.sale_price = request.body().sale_price

      await DQ.save()

      logger.info('Room Updated Successfully!')

      return response.ok({
        code: 200,
        message: 'Updated successfully!',
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

  async destroy({ request, response }: HttpContext) {
    const DQ = await Room.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: 400,
        message: 'Data not found',
      })
    }
    await DQ.delete()

    logger.info(`Room ${request.param('id')} deleted Successfully!`)

    return response.ok({
      code: 200,
      message: 'Deleted successfully!',
    })
  }
}
