import { useState } from "react"
import { toast, Toaster } from 'react-hot-toast'
import { create } from "../services/recipes"

const AddRecipe = () => {
  const [step, setStep] = useState(1)
  const [progressBar, setProgressBar] = useState(0)

  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const recipe = {
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions,
      }
      const newRecipe = await create(recipe)
      console.log('new recipe', newRecipe)
    } catch(error) {
      console.error(error)
    }
    console.log('submit')
  }

  const handleNextStep = () => {
    if(step < 4) {
      setStep(step + 1)
      setProgressBar(progressBar + 25)
    }
  }

  const handlePrevStep = () => {
    if(step > 1) {
      setStep(step - 1)
      setProgressBar(progressBar - 25)
    }
  }

  return (
    <div className="mt-[100px] px-10">
      <h1 className="text-3xl mb-7 text-center">Add recipe</h1>

      <Toaster />

      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">

        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressBar}%` }}></div>
        </div>

        {step === 1 && (
          <Step1
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            recipeName={recipeName}
            setRecipeName={setRecipeName}
          />
        )}

        {step === 2 && (
          <Step2 
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            setIngredients={setIngredients}
            ingredients={ingredients}
          />
        )}

        {step === 3 && (
          <Step3 
            handleNextStep={handleNextStep} 
            handlePrevStep={handlePrevStep} 
            instructions={instructions} 
            setInstructions={setInstructions}
          />
        )}

        {step === 4 && (
          <Step4
            handlePrevStep={handlePrevStep} 
            recipeName={recipeName}
            instructions={instructions}
            ingredients={ingredients}
          />
        )}

      </form>
    </div>
  )
}

const Step1 = ({ handleNextStep, handlePrevStep, recipeName, setRecipeName}) => {
  const checkNextStep = () => {
    if (recipeName.length < 3) {
      toast.error('Recipe name must be at least 3 characters')
      return 
    } else {
      handleNextStep()
    }
  }
  return (
    <>
      <div className="mb-5">
        <label htmlFor="recipeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe name*</label>
        <input 
          type="text" 
          id="recipeName" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="recipe name" 
          required 
          value={recipeName}
          onChange={({ target }) => setRecipeName(target.value)}
        />
      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={checkNextStep}
        >Next</button>
      </div>

    </>
  )
}

const Step2 = ({ handleNextStep, handlePrevStep, ingredients, setIngredients }) => {
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')
  const [ingredient, setIngredient] = useState('')

  const addIngredient = () => {
    if (ingredient.length < 3 || unit.length < 1 || amount.length < 1) {
      toast.error('All fields are required')
      return
    } else {
      const singleIngredient = {
        amount: amount,
        unit: unit,
        ingredient: ingredient
      }
  
      setIngredients(ingredients.concat(singleIngredient))
      setAmount('')
      setUnit('')
      setIngredient('')
    }
  }

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  const checkNextStep = () => {
    if(ingredients.length < 1) {
      toast.error('Must have at least on ingredient')
    } else {
      handleNextStep()
    }
  }

  return (
    <>
      <div className="mb-5">
        <h3 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Ainesosat</h3>

        <div className="flex space-x-2">

          <input 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Ainesosan nimi" 
            value={ingredient}
            onChange={({ target }) => setIngredient(target.value)}
          />

          <input 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Määrä" 
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
          />

          <input 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Mittayksikkö" 
            value={unit}
            onChange={({ target }) => setUnit(target.value)}
          />

          <button 
            type="button"
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={addIngredient}
          >
                +
          </button>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={ingredient.ingredient} className="mt-3 flex gap-1 h-[30px]">
            <p>{ingredient.amount}</p>
            <p>{ingredient.unit}</p>
            <p>{ingredient.ingredient}</p>
            <button
              type="button"
              className="ml-auto bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => deleteIngredient(index)}
            >
                  -
            </button>
          </div>
        ))}

      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={checkNextStep}
        >Next</button>
      </div>
            
    </>
  )
}

const Step3 = ({ handleNextStep, handlePrevStep, instructions, setInstructions}) => {
  const [instruction, setInstruction] = useState('')

  const addInstruction = () => {
    if (instruction.length < 3) {
      toast.error('Instruction must be at least 3 characters long')
      return
    } else {
      setInstructions(instructions.concat(instruction))
      setInstruction('')
    }
  }

  const deleteInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const checkNextStep = () => {
    if(instructions.length < 1) {
      toast.error('Must have at least one instruction')
      return
    } else {
      handleNextStep()
    }
  }

  return (
    <>
      <div className="mb-5">
        <h3 className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Ohjeet</h3>

        <div className="mb-5 flex gap-1">
          <input 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="instruction" 
            required 
            value={instruction}
            onChange={({ target }) => setInstruction(target.value)}
          />

          <button 
            type="button"
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={addInstruction}
          >
                +
          </button>
        </div>


        {instructions.map((instruction, index) => (
          <div key={instruction} className="mt-3 flex gap-1 h-[30px]">
            <p>{index + 1}. {instruction}</p>
            <button
              type="button"
              className="ml-auto bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => deleteInstruction(index)}
            >
            -
            </button>
          </div>
        ))}

      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={checkNextStep}
        >Next</button>
      </div>
            
    </>
  )
}

const Step4 = ({ recipeName, instructions, ingredients, handlePrevStep }) => {
  return (
    <div>
      <h3>{recipeName}</h3>
      <div className="flex">

        <div className="w-1/2">
          <h4>Ohjeet:</h4>
          {instructions.map((instruction, index) => (
            <div key={instruction}>
              <p>{index + 1}. {instruction}</p>
            </div>
          ))}
        </div>

        <div className="w-1/2">
          <h4>Ainesosat:</h4>
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.ingredient} className="flex gap-1">
              <p>{index + 1}. {ingredient.ingredient}</p>
              <p>{ingredient.amount}</p>
              <p>{ingredient.unit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button 
          type="button" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="submit" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
        >Save</button>
      </div>
    </div>
  )
}
 
export default AddRecipe