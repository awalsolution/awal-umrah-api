import { HttpContext } from '@adonisjs/core/http'
import { BaseController } from '#controllers/base_controller'
import Bed from '#models/tenant/bed'
import logger from '@adonisjs/core/services/logger'

export default class AuthController extends BaseController {
  async index({ request, response }: HttpContext) {
    try {
      let DQ = Bed.query()

      const page = request.input('page')
      const pageSize = request.input('pageSize')

      if (request.input('name')) {
        DQ = DQ.whereILike('name', request.input('name') + '%')
      }
      if (request.input('room_id')) {
        DQ = DQ.where('room_id', request.input('room_id'))
      }
      if (request.input('status')) {
        DQ = DQ.where('status', request.input('status'))
      }
      if (request.input('hotel_id')) {
        DQ = DQ.where('hotel_id', request.input('hotel_id'))
      }

      let data
      if (pageSize) {
        data = await DQ.paginate(page, pageSize)
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
}
