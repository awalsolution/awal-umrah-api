import BaseController from '#controllers/base_controller'
import { HttpContext } from '@adonisjs/core/http'
import HttpCodes from '#enums/http_codes'
import User from '#models/user'
import ResponseMessages from '#enums/response_messages'

export default class UserController extends BaseController {
  declare MODEL: typeof User

  constructor() {
    super()
    this.MODEL = User
  }

  // find all users  list
  async findAllRecords({ auth, request, response }: HttpContext) {
    const currentUser = auth.user!
    let DQ = this.MODEL.query().whereNotIn('id', [currentUser.id, 1])

    const page = request.input('page')
    const perPage = request.input('perPage')

    // name filter
    if (request.input('name')) {
      DQ = DQ.whereILike('email', request.input('name') + '%')
    }

    if (!this.isSuperAdmin(currentUser)) {
      if (!this.ischeckAllSuperAdminUser(currentUser)) {
        DQ = DQ.where('shop_id', currentUser.shopId!)
      }
    }

    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'Users Not Found',
      })
    }

    if (perPage) {
      return response.ok({
        code: HttpCodes.SUCCESS,
        result: await DQ.preload('permissions')
          .preload('roles', (PQ) => {
            PQ.preload('permissions')
          })
          .preload('userProfile')
          .preload('shop')
          .paginate(page, perPage),
        message: 'Users find Successfully',
      })
    } else {
      return response.ok({
        code: HttpCodes.SUCCESS,
        result: await DQ.preload('permissions')
          .preload('roles', (PQ) => {
            PQ.preload('permissions')
          })
          .preload('userProfile')
          .preload('shop'),
        message: 'Users find Successfully',
      })
    }
  }

  // find single user by id
  async findSingleRecord({ request, response }: HttpContext) {
    try {
      const data = await this.MODEL.query()
        .where('id', request.param('id'))
        .preload('permissions')
        .preload('roles', (RQ) => {
          RQ.where('name', '!=', 'super admin').preload('permissions')
        })
        .preload('userProfile')
        .preload('shop')
        .first()

      if (data) {
        delete data.$attributes.password
      }

      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'User find Successfully!',
        result: data,
      })
    } catch (e) {
      return response
        .status(HttpCodes.SERVER_ERROR)
        .send({ code: HttpCodes.SERVER_ERROR, message: e.toString() })
    }
  }

  // create new user
  async create({ auth, request, response }: HttpContext) {
    const currentUser = auth.user!
    try {
      let DE = await this.MODEL.findBy('email', request.body().email)
      if (DE && !DE.is_email_verified) {
        delete DE.$attributes.password

        return response.conflict({
          code: HttpCodes.CONFLICTS,
          message: `Provided Email: ' ${request.body().email} ' Already exists`,
        })
      }

      const DM = new this.MODEL()
      if (await this.isSuperAdmin(currentUser)) {
        DM.shopId = request.body().shop_id
      } else {
        DM.shopId = currentUser.shopId
      }
      DM.email = request.body().email
      DM.status = request.body().status
      DM.password = request.body().password

      await DM.save()
      DM.related('roles').sync(request.body().roles)
      DM.related('userProfile').create({
        first_name: request.body().first_name,
        last_name: request.body().last_name,
        phone_number: request.body().phone_number,
      })

      delete DM.$attributes.password
      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'User Register Successfully!',
        result: DM,
      })
    } catch (e) {
      console.log('register error', e.toString())
      return response.internalServerError({
        code: HttpCodes.SERVER_ERROR,
        message: e.toString(),
      })
    }
  }

  // update user
  async update({ auth, request, response }: HttpContext) {
    const currentUser = auth.user!
    const DQ = await this.MODEL.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'User Not Found',
      })
    }

    if (await this.isSuperAdmin(currentUser)) {
      DQ.shopId = request.body().shop_id
    } else {
      DQ.shopId = currentUser.shopId
    }

    DQ.email = request.body().email
    DQ.status = request.body().status

    await DQ.save()
    DQ.related('permissions').sync(request.body().permissions)
    DQ.related('roles').sync(request.body().roles)

    delete DQ.$attributes.password
    return response.ok({
      code: HttpCodes.SUCCESS,
      message: 'User Update successfully.',
      result: DQ,
    })
  }

  // assign permission to user
  async assignPermission({ auth, request, response }: HttpContext) {
    const currentUser = auth.user!
    const DQ = await this.MODEL.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'User Not Found',
      })
    }

    if (await this.isSuperAdmin(currentUser)) {
      DQ.shopId = request.body().shop_id
    } else {
      DQ.shopId = currentUser.shopId
    }

    await DQ.save()
    DQ.related('permissions').sync(request.body().permissions)

    delete DQ.$attributes.password
    return response.ok({
      code: HttpCodes.SUCCESS,
      message: 'Assigned Permissions successfully.',
      result: DQ,
    })
  }

  // update user profile
  async profileUpdate({ request, response }: HttpContext) {
    const DQ = await this.MODEL.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'User Not Found',
      })
    }
    DQ.related('userProfile').updateOrCreate(
      {},
      {
        first_name: request.body().first_name,
        last_name: request.body().last_name,
        phone_number: request.body().phone_number,
        address: request.body().address,
        city: request.body().city,
        country: request.body().country,
        profile_picture: request.body().profile_picture,
      }
    )

    delete DQ.$attributes.password
    return response.ok({
      code: HttpCodes.SUCCESS,
      message: 'User Profile Update successfully.',
      result: DQ,
    })
  }

  // delete single user using id
  async destroy({ request, response }: HttpContext) {
    const DQ = await this.MODEL.findBy('id', request.param('id'))
    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'User not found',
      })
    }
    await DQ.delete()
    return response.ok({
      code: HttpCodes.SUCCESS,
      result: { message: 'User deleted successfully' },
    })
  }

  // auth user
  async authenticated({ auth, response }: HttpContext) {
    const authenticatedUser = auth.user
    if (!authenticatedUser) {
      return response.unauthorized({ message: ResponseMessages.UNAUTHORIZED })
    }
    delete authenticatedUser.$attributes.password
    return response.ok({
      code: HttpCodes.SUCCESS,
      message: 'User find Successfully',
      result: auth.user,
    })
  }
}
