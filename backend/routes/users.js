const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('recipes', { name: 1, ingredients: 1, instructions: 1, timeUsed: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate('recipes', { name: 1, ingredients: 1, instructions: 1, timeUsed: 1 })
    response.json(user)
  } catch (error) {
    next(error)
  }
}) 

usersRouter.post('/', async (request, response, next) => {
  try {
    let { username, name, password, avatarId } = request.body

    if (!username || !password) {
      return response.status(400).json({ error: 'Username and password required' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    username = username.toLowerCase()

    const user = new User({
      username,
      name,
      passwordHash,
      avatarId
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {
    next(error) 
  }
}) 

usersRouter.put('/:id', async (request, response, next) => {
  try {
    let { avatarId } = request.body

    if (!request.token) {
      return response.status(401).json({ error: 'Token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (decodedToken) {
      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        { avatarId },
        { new: true, runValidators: true, context: 'query' }
      )

      if (!updatedUser) {
        return response.status(404).json({ error: 'User not found' })
      }

      response.json(updatedUser)
    }

  } catch (error) {
    console.error(error)
    next(error)
  }
  
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing' })
    }
 
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (decodedToken) {
      const user = await User.findById(request.params.id)

      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }
    
      if(decodedToken.id !== user.id) {
        return response.status(403).json({ error: 'Unauthorized to delete this user' })
      }

      /*tästä lähtee poistetun käyttäjän reseptien poisto*/

      await Recipe.deleteMany({ user: user.id})

      await User.findByIdAndDelete(user.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'token invalid' })
    }
    
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = usersRouter