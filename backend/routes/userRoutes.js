const usersRouter = require('express').Router()

const users = [
  {
    name: 'user1'
  },
  {
    name: 'user2'
  }
]

usersRouter.get('/', async (request, response) => {
  response.json(users)
})

module.exports = usersRouter