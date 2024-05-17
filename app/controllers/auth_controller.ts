import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      let DE = await User.findBy('email', request.body().email)
      if (DE && !DE.is_email_verified) {
        delete DE.$attributes.password

        return response.conflict({
          code: 409,
          message: 'Record already exists!',
        })
      }

      const user = new User()
      user.email = request.body().email
      user.password = request.body().password

      await user.save()

      user.related('profile').create({
        first_name: request.body().first_name,
        last_name: request.body().last_name,
        phone_number: request.body().phone_number,
      })

      return response.ok({
        code: 200,
        message: 'Register successfully!',
        data: user,
      })
    } catch (e) {
      console.log('register error', e.toString())
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user, ['*'], {
        name: 'login_token',
      })
      return response.ok({
        code: 200,
        message: 'Login successfully!',
        data: token,
      })
    } catch (e) {
      console.log(e)
      return response.internalServerError({
        code: 500,
        message: e.toString(),
      })
    }
  }

  async authenticated({ auth, response }: HttpContext) {
    const authenticatedUser = auth.use('api').user!
    if (!authenticatedUser) {
      return response.unauthorized({ code: 401, message: 'Unauthorized' })
    }
    delete authenticatedUser.$attributes.password
    return response.ok({
      code: 200,
      message: 'Record find successfully!',
      data: authenticatedUser,
    })
  }

  async logout({ auth, response }: HttpContext) {
    const currentUser = auth.user!
    await User.accessTokens.delete(currentUser, currentUser.currentAccessToken.identifier)
    return response.ok({
      code: 200,
      message: 'Logout successfully!',
    })
  }
}
