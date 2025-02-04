const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  category: String,
  timeUsed: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe