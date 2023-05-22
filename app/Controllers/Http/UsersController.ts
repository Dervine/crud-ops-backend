import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    return response.json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const userData = request.only(['name', 'email', 'password'])

    const user = await User.create(userData)

    return response.status(201).json(user)
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    return response.json(user)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    user.merge(request.only(['name', 'email', 'password']))
    await user.save()

    return response.json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    await user.delete()

    return response.status(204).send('Deleted')
  }
}
