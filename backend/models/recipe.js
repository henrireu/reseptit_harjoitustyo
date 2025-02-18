const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [
      new mongoose.Schema(
        {
          amount: { type: String, required: true },
          unit: { type: String, required: true },
          ingredient: { type: String, required: true }
        },
        { _id: false }
      )
    ],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'Recipe must have at least one ingredient'
    }
  },

  instructions: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0
      },
      message: 'Instructions must have at least one instruction'
    }
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  /*timeUsed: {
    type: String,
    required: true
  },*/
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe