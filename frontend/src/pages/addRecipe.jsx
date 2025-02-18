import { useState, useEffect } from "react"
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

import { create } from "../services/recipes"
import FileUpload from "../components/fileUpload"
//import NewRecipeCard from "../components/newRecipeCard"
import LoadingButton from "../components/loadingButton"

const AddRecipe = () => {
  const [step, setStep] = useState(1)
  const [progressBar, setProgressBar] = useState(0)
  const [loading, setLoading] = useState(false)

  const [recipeName, setRecipeName] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const recipe = {
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        imageFile: imageFile
      }
      await create(recipe)
      toast.success('Resepti luotu onnistuneesti')
      setTimeout(() => {
        navigate('/reseptit')
      }, 4000)
    } catch(error) {
      console.error(error)
      toast.error('Reseptin luonti epäonnistui. Jokin meni vikaan.')
    } finally {
      setLoading(false)
    }
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
            imageFile={imageFile}
            setImageFile={setImageFile}
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
            imageFile={imageFile}
            loading={loading}
            setLoading={setLoading}
          />
        )}

      </form>
    </div>
  )
}

const Step1 = ({ handleNextStep, handlePrevStep, recipeName, setRecipeName, imageFile, setImageFile }) => {
  const checkNextStep = () => {
    if (recipeName.length < 3) {
      toast.error('Recipe name must be at least 3 characters')
      return 
    } else if (imageFile === null) {
      toast.error('You must upload image for recipe')
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

      <FileUpload file={imageFile} setFile={setImageFile}/>

      <div className="flex justify-between mt-5">
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
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
      toast.error('Kaikki kentät on täytettävä')
      return
    } else if (ingredients.some(i => i.ingredient === ingredient)){
      toast.error('Ei voi lisätä samaa ainesosaa kahdesti')
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
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
            onClick={addIngredient}
          >
                +
          </button>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={ingredient.ingredient} className="mt-3 flex gap-1 h-[30px]">
            <p>{ingredient.ingredient}</p>
            <p>{ingredient.amount}</p>
            <p>{ingredient.unit}</p>
            <div
              className="ml-auto hover:cursor-pointer"
              onClick={() => deleteIngredient(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </div>
        ))}

      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
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
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
            onClick={addInstruction}
          >
                +
          </button>
        </div>


        {instructions.map((instruction, index) => (
          <div key={instruction} className="mt-3 flex gap-1 min-h-[30px]">
            <p><span className="bg-gray-300 p-1 rounded-full aspect-square">{index + 1}.</span> {instruction}</p>
            <div
              className="ml-auto hover:cursor-pointer"
              onClick={() => deleteInstruction(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </div>
        ))}

      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={checkNextStep}
        >Next</button>
      </div>
            
    </>
  )
}

const Step4 = ({ recipeName, instructions, ingredients, handlePrevStep, imageFile, loading }) => {
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    if (imageFile) {
      const objectURL = URL.createObjectURL(imageFile)
      setImageURL(objectURL);

      return () => URL.revokeObjectURL(objectURL)
    }
  }, [imageFile])

  return (
    <div>
      <h3 className="text-2xl font-semibold">{recipeName}</h3>
      {imageURL && imageFile && (
        <img src={imageURL} alt="Recipe" className="max-w-xs mt-5 h-64" />
      )}
      <div className="flex flex-col mt-5">
        <div>
          <h4 className="text-xl font-semibold mb-5">Ohjeet:</h4>
          {instructions.map((instruction, index) => (
            <div key={instruction} className="mt-3">
              <p><span className="bg-gray-300 p-1 rounded-full aspect-square">{index + 1}.</span> {instruction}</p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-5 mt-5">Ainesosat:</h4>
          {ingredients.map(ingredient => (
            <div key={ingredient.ingredient} className="flex gap-1 mt-3">
              <p>- {ingredient.ingredient}</p>
              <p>{ingredient.amount}</p>
              <p>{ingredient.unit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button 
          type="button" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          onClick={handlePrevStep}
        >Back</button>
        {loading ? (
          <LoadingButton />
        ) : (
          <button 
            type="submit" 
            className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          >Tallenna</button>
        )}

      </div>
    </div>
  )
}
 
export default AddRecipe