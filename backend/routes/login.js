const jwt = require('jsonwebtoken')
//const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {

  try {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null 
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
    if(!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id
    }
  
    const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      // 2h
      { expiresIn: 60*120 }
    )
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name, userId: user._id })
  } catch(error) {
    next(error)
  }
})

module.exports = loginRouter