import { useState } from "react"

const AddRecipe = () => {
  const [step, setStep] = useState(1)
  const [recipeName, setRecipeName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="mt-[100px] px-10">
      <h1 className="text-3xl mb-7 text-center">Add recipe</h1>

      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">

        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%"}}></div>
        </div>

        {step === 1 && (
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

            <button 
              type="button" 
              className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
              onClick={handleNextStep}
            >Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-5">
              <label htmlFor="recipeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients*</label>
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

            <button 
              type="button" 
              className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
              onClick={handlePrevStep}
            >Back</button>
            <button 
              type="button" 
              className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
              onClick={handleNextStep}
            >Next</button>
          </>
        )}

      </form>
    </div>
  )
}
 
export default AddRecipe