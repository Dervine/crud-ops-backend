import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Create a user
  Route.post('/users', 'UsersController.store')

  // Read all users
  Route.get('/users', 'UsersController.index')

  // Read a specific user
  Route.get('/users/:id', 'UsersController.show')

  // Update a user
  Route.put('/users/:id', 'UsersController.update')

  // Delete a user
  Route.delete('/users/:id', 'UsersController.destroy')
}).prefix('v1')
