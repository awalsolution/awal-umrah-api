import { HttpContext } from '@adonisjs/core/http'
import { BaseController } from '#controllers/base_controller'
import Hotel from '#models/tenant/hotel'
import logger from '@adonisjs/core/services/logger'

export default class HotelController extends BaseController {
  async index({ request, response }: HttpContext) {
    try {
      let DQ = Hotel.query()

      const page = request.input('page')
      const perPage = request.input('perPage')

      if (request.input('name')) {
        DQ = DQ.whereILike('name', request.input('name') + '%')
      }
      // name filter
      if (request.input('owner')) {
        DQ = DQ.whereILike('owner', request.input('owner') + '%')
      }
      // status filter
      if (request.input('status')) {
        DQ = DQ.whereILike('status', request.input('status') + '%')
      }
      // city filter
      if (request.input('city')) {
        DQ = DQ.whereILike('city', request.input('city') + '%')
      }

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
      const DQ = await Hotel.query().where('id', request.param('id')).first()

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
      const DE = await Hotel.findBy('name', request.body().name)

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Data already exists!',
        })
      }

      const DM = new Hotel()

      DM.name = request.body().name
      DM.phone_number = request.body().phone_number
      DM.owner = request.body().owner
      DM.owner_phone = request.body().owner_phone
      DM.status = request.body().status
      DM.address = request.body().address
      DM.city = request.body().city
      DM.state = request.body().state
      DM.country = request.body().country

      const DQ = await DM.save()

      logger.info(`Hotel with id:${DQ.id} Created Successfully!`)

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
      const DQ = await Hotel.findBy('id', request.param('id'))
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }
      const DE = await Hotel.query()
        .where('name', 'like', request.body().name)
        .whereNot('id', request.param('id'))
        .first()

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Record already exist!',
        })
      }

      DQ.name = request.body().name
      DQ.phone_number = request.body().phone_number
      DQ.owner = request.body().owner
      DQ.owner_phone = request.body().owner_phone
      DQ.status = request.body().status
      DQ.address = request.body().address
      DQ.city = request.body().city
      DQ.state = request.body().state
      DQ.country = request.body().country

      await DQ.save()

      logger.info('Hotel Updated Successfully!')

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
    const DQ = await Hotel.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: 400,
        message: 'Data not found',
      })
    }
    await DQ.delete()

    logger.info(`Hotel ${request.param('id')} deleted Successfully!`)

    return response.ok({
      code: 200,
      message: 'Deleted successfully!',
    })
  }
}
