const express = require('express')
const app = express()

const usersRouter = require('./routes/userRoutes')

app.use('/api/users', usersRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})