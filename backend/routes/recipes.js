const jwt = require('jsonwebtoken')
const recipesRouter = require('express').Router()

const { upload, cloudinary } = require('../config/cloudinary')
const Recipe = require('../models/recipe')
const User = require('../models/user')

recipesRouter.get('/', async (request, response, next) => {
  const recipes = await Recipe.find({})
    .sort({ createdAt: -1 })
    .populate('user', { username: 1, name: 1 })

  response.json(recipes)
})

recipesRouter.get('/latest', async (request, response, next) => {
  try {
    const latestRecipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('user', { username: 1, name: 1 }) 

    response.json(latestRecipes)
  } catch (error) {
    next(error)
  } 
})

recipesRouter.get('/:id', async (request, response, next) => {
  try {
    const recipe = await Recipe.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (recipe){
      response.json(recipe)
    } else {
      response.status(404).json({ error: "Recipe not found" })
    }
  } catch(error) {
    next(error)
  }
})


recipesRouter.post('/', upload.single('image'), async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }
    
    const { name, ingredients, instructions, timeUsed } = request.body

    if (!request.file) {
      return response.status(400).json({ message: "No image uploaded" })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }


    const parsedIngredients = JSON.parse(ingredients)
    const parsedInstructions = JSON.parse(instructions)

    const recipe = new Recipe({
      name,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      timeUsed: timeUsed,
      imageUrl: request.file.path, 
      imageName: request.file.filename,
      user: user._id,
    })

    const savedRecipe = await recipe.save()
    user.recipes = user.recipes.concat(savedRecipe._id)
    await user.save()

    response.json(savedRecipe)
  } catch(error) {
    console.error('here error:', error)
    next(error)
  }
})

recipesRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const recipe = await Recipe.findById(request.params.id)

    if(!recipe) {
      return response.status(404).json({ error: 'Recipe not found' })
    }

    if(recipe.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Unauthorized to delete this recipe' })
    }

    console.log('recipe', recipe)

    const cloudinaryResult = await cloudinary.uploader.destroy(recipe.imageName)
    console.log('cloudinaryResult',cloudinaryResult)

    await Recipe.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

recipesRouter.put('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const recipe = await Recipe.findById(request.params.id)
    
    if (!recipe) {
      return response.status(404).json({ error: 'Recipe not found' })
    }

    if (recipe.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Unauthorized to update this recipe' })
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true } 
    ).populate('user', { username: 1, name: 1 })

    response.json(updatedRecipe)
  } catch (error) {
    next(error)
  }
})

recipesRouter.put('/:id/image', upload.single('image'), async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }
    
    const { name, ingredients, instructions, timeUsed, oldImageName } = request.body

    if (!request.file) {
      return response.status(400).json({ message: "No image uploaded" })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }


    const parsedIngredients = JSON.parse(ingredients)
    const parsedInstructions = JSON.parse(instructions)


    const updatedRecipe = await Recipe.findByIdAndUpdate(
      request.params.id,
      {
        name,
        ingredients: parsedIngredients,
        instructions: parsedInstructions,
        timeUsed,
        imageUrl: request.file.path, 
        imageName: request.file.filename,
      },
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1 })

    if (!updatedRecipe) {
      return response.status(404).json({ error: 'Recipe not found' })
    }

    const cloudinaryResult = await cloudinary.uploader.destroy(oldImageName)
    console.log('cloudinaryResult',cloudinaryResult)

    response.json(updatedRecipe)
  } catch(error) {
    next(error)
  }
})

module.exports = recipesRouter