const jwt = require('jsonwebtoken')
const reviewsRouter = require('express').Router()

const Review = require('../models/review')
const User = require('../models/user')
const Recipe = require('../models/recipe')

reviewsRouter.get('/', async (request, response) => {
  const reviews = await Review.find({})
    .sort({ createdAt: -1 })
    .populate('user', { username: 1, name: 1 })

  response.json(reviews)
})

reviewsRouter.get('/:recipeId', async (request, response, next) => {
  try {
    const { recipeId } = request.params  

    console.log(request.params)

    const reviews = await Review.find({ recipeId })
      .sort({ createdAt: -1 }) 
      .populate('user', { username: 1, name: 1 })  

    response.json(reviews)
  } catch (error) {
    next(error)
  }
})

reviewsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const { rating, comment, recipeId } = request.body

    const recipe = await Recipe.findById(recipeId)

    const recipeUserId = recipe.user._id.toString()
    const userId = user._id.toString()
    
    console.log('userId', userId)
    console.log('recipe userid', userId)

    if (userId === recipeUserId) {
      return response.status(403).json({ error: 'The creator of the recipe cannot review their own recipe.' })
    }

    const review = new Review({
      rating,
      comment,
      recipeId,
      user: user._id
    })

    const savedReview = await review.save()
    response.status(201).json(savedReview)

  } catch (error) {
    next(error)
  }
})

module.exports = reviewsRouter