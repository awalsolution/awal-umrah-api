import { HttpContext } from '@adonisjs/core/http'
import Agency from '#models/tenant/agency'

export default class AgenciesController {
  async index({ request, response }: HttpContext) {
    let DQ = Agency.query()

    const page = request.input('page')
    const perPage = request.input('perPage')

    if (request.input('name')) {
      DQ = DQ.whereILike('agency_name', request.input('name') + '%')
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
      const DQ = await Agency.query().where('id', request.param('id')).first()

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

  async create({ request, response }: HttpContext) {
    try {
      const DE = await Agency.findBy('agency_name', request.body().name)

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Data already exists!',
        })
      }

      const DM = new Agency()

      DM.agency_name = request.body().name
      DM.phone = request.body().phone
      DM.status = request.body().status
      DM.address = request.body().address
      DM.city = request.body().city
      DM.state = request.body().state
      DM.country = request.body().country
      DM.logo = request.body().logo
      // DM.created_by = currentUser?.profile?.first_name! + currentUser?.profile?.last_name

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

  async update({ request, response }: HttpContext) {
    try {
      const DQ = await Agency.findBy('id', request.param('id'))
      if (!DQ) {
        return response.notFound({
          code: 400,
          message: 'Data does not exists!',
        })
      }
      const DE = await Agency.query()
        .where('agency_name', 'like', request.body().name)
        .whereNot('id', request.param('id'))
        .first()

      if (DE) {
        return response.conflict({
          code: 409,
          message: 'Record already exist!',
        })
      }

      DQ.agency_name = request.body().name
      DQ.phone = request.body().phone
      DQ.status = request.body().status
      DQ.address = request.body().address
      DQ.city = request.body().city
      DQ.state = request.body().state
      DQ.country = request.body().country
      DQ.logo = request.body().logo
      // DQ.created_by = currentUser?.profile?.first_name! + currentUser?.profile?.last_name

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
    const DQ = await Agency.findBy('id', request.param('id'))
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
