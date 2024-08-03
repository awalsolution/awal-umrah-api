import { HttpContext } from '@adonisjs/core/http'
import { BaseController } from '#controllers/base_controller'
import VisaCompany from '#models/tenant/visa_company'

export default class VisaCompanyController extends BaseController {
  async index({ request, response }: HttpContext) {
    let DQ = VisaCompany.query()

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
      const DQ = await VisaCompany.query().where('id', request.param('id')).first()

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
      const DE = await VisaCompany.findBy('name', request.body().name)

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Data already exists!',
        })
      }

      const DM = new VisaCompany()

      DM.name = request.body().name
      DM.email = request.body().email
      DM.phone_number = request.body().phone_number
      DM.phone = request.body().phone
      DM.status = request.body().status
      DM.address = request.body().address
      DM.logo = request.body().logo
      DM.created_by = currentUser?.profile?.first_name! + currentUser?.profile?.last_name

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
      const DQ = await VisaCompany.findBy('id', request.param('id'))
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }
      const DE = await VisaCompany.query()
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
      DQ.email = request.body().email
      DQ.phone_number = request.body().phone_number
      DQ.phone = request.body().phone
      DQ.status = request.body().status
      DQ.address = request.body().address
      DQ.logo = request.body().logo
      DQ.created_by = currentUser?.profile?.first_name! + currentUser?.profile?.last_name

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
    const DQ = await VisaCompany.findBy('id', request.param('id'))
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
