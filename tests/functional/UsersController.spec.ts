import { test } from '@japa/runner'

test.group('List users', () => {
  test('create a new user', async ({ client, assert }) => {
    const response = await client
      .post('/v1/users')
      .json({
          name: 'Cool Name',
          email: 'coolname@gmail.com',
          password: 'cool-pass'
        })
    
 
    assert.equal(response.status(), 201)
    assert.equal(response.body().name, 'Cool Name')
    // console.log(response.body())
  })


  test('get a list of all users created', async ({ client, assert }) => {
    const response = await client.get('/v1/users')

    assert.notEmpty(response.body())
    assert.containsSubset(
        response.body(),
        [{ name: 'Cool Name' }, { email: 'coolname@gmail.com' }]
      )
    // console.log(response.body())
  })

  test('get a user by their id', async ({ client, assert }) => {
    const response = await client.get('/v1/users/1')

    assert.notEmpty(response.body())
    assert.equal(response.body().id, 1)

    // console.log(response.body())
  })

  test('return a message when user is not found', async ({ client, assert }) => {
    const response = await client.get('/v1/users/1900')

    assert.equal(response.status(), 404)
    assert.equal(response.body().message, 'User not found')

    // console.log(response.body())
  })

  test('update a user', async ({ client, assert }) => {
    const response = await client
      .put('/v1/users/1')
      .json({
        email: 'anothercoolname@gmail.com'
      })

    assert.equal(response.body().email, 'anothercoolname@gmail.com')
    // console.log(response.body())
  })

  test('delete an existing user', async ({ client, assert }) => {
    const response = await client.delete('/v1/users/13')
    const fetchUser = await client.get('/v1/users/13')

    assert.equal(response.status(), 204)
    assert.equal(fetchUser.body().message, 'User not found')

    // console.log(fetchUser.body())
  })
})
