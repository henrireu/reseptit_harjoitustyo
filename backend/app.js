require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const errorHandler = require('./middleware/errorHandler')
const usersRouter = require('./routes/users')

console.log('connecting to mongodb')

app.use(express.json())
app.use(cors())

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error(error)
  })

app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app