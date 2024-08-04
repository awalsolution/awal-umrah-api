import { HttpContext } from '@adonisjs/core/http'
import { BaseController } from '#controllers/base_controller'
import Visa from '#models/tenant/visa'

export default class VisaController extends BaseController {
  async index({ request, response }: HttpContext) {
    let DQ = Visa.query()

    const page = request.input('page')
    const perPage = request.input('perPage')

    if (request.input('name')) {
      DQ = DQ.whereILike('name', request.input('name') + '%')
    }

    if (perPage) {
      return response.ok({
        code: 200,
        data: await DQ.paginate(page, perPage),
        message: 'Record find successfully!',
      })
    } else {
      return response.ok({
        code: 200,
        data: await DQ,
        message: 'Record find successfully!',
      })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const DQ = await Visa.query().where('id', request.param('id')).first()

      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }

      return response.ok({
        code: 200,
        message: 'Record find successfully!',
        data: DQ,
      })
    } catch (e) {
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }

  async create({ auth, request, response }: HttpContext) {
    try {
      const currentUser = auth.user!
      const DE = await Visa.findBy('name', request.body().name)

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Data already exists!',
        })
      }

      const DM = new Visa()

      DM.first_name = request.body().first_name
      DM.last_name = request.body().last_name
      DM.status = request.body().status
      DM.created_by = currentUser?.profile?.first_name! + ' ' + currentUser?.profile?.last_name

      const DQ = await DM.save()
      return response.ok({
        code: 200,
        message: 'Created successfully!',
        data: DQ,
      })
    } catch (e) {
      console.log(e)
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }

  async update({ auth, request, response }: HttpContext) {
    try {
      const currentUser = auth.user!
      const DQ = await Visa.findBy('id', request.param('id'))
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }
      const DE = await Visa.query()
        .where('name', 'like', request.body().name)
        .whereNot('id', request.param('id'))
        .first()

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Record already exist!',
        })
      }

      DQ.first_name = request.body().first_name
      DQ.last_name = request.body().last_name
      DQ.status = request.body().status
      DQ.created_by = currentUser?.profile?.first_name! + ' ' + currentUser?.profile?.last_name

      await DQ.save()
      return response.ok({
        code: 200,
        message: 'Updated successfully!',
        data: DQ,
      })
    } catch (e) {
      console.log(e)
      return response.internalServerError({
        code: 500,
        message: e.message,
      })
    }
  }

  async destroy({ request, response }: HttpContext) {
    const DQ = await Visa.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: 400,
        message: 'Data not found',
      })
    }
    await DQ.delete()
    return response.ok({
      code: 200,
      message: 'Deleted successfully!',
    })
  }
}
