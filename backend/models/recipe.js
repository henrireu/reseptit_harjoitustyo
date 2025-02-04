const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0
      },
      message: 'Recipe must have at least one ingredient'
    }
  },
  instructions: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  timeUsed: {
    type: Number,
    required: true
  },
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