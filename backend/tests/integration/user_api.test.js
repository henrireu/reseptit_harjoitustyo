require('dotenv').config()
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const assert = require('node:assert')
const api = supertest(app)
const helper = require('../test_helper')
//const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      username: 'root',
      name: 'Superuser', 
      avatarId: 1,
      passwordHash 
    })
  
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',  
      password: 'salainen',
      avatarId: 1
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
      avatarId: 1
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('login succeeds with proper username and password', async () => {
    const user = {
      username: 'root',
      password: 'sekret'
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    assert(response.body.token, 'Response should contain a token')
  })

  test('login fails with wrong username or password', async () => {
    const user = {
      username: 'root',
      password: 'sekrettt'
    }

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(401)

    assert(!response.body.token, 'Response should not contain a token')
    
  })

  after(async () => {
    await mongoose.connection.close()
  })
})