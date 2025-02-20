import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import LoadingPage from "../components/loadingPage"
import { getAllRecipes } from "../services/recipes"
import RecipeCard from "../components/recipeCard"

const Recipes = () => {
  const [recipestate, setRecipestate] = useState("kaikki")
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    const getRecipes = async () => {
      setError('')
      try {
        const allRecipes = await getAllRecipes()
        console.log(allRecipes)
        setRecipes(allRecipes)
      } catch (error) {
        console.error('Error fetching recipes:', error.message)
        setError('Jokin meni vikaan reseptejä hakiessa. Kokeile myöhemmin uudestaan')
      } finally {
        setLoading(false)
      }
    }

    getRecipes()
  }, [])

  if (loading) {
    return (
      <LoadingPage />
    )
  }

  return (
    <div className="mt-[100px] px-10 max-w-[1400px] mx-auto mb-10">

      {user && (
        <div className="flex justify-center gap-10">
          <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              value="kaikki"
              name="recipes"
              checked={recipestate === "kaikki"}
              onChange={(e) => setRecipestate(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
            Kaikki reseptit
            </label>
          </div>

        
          <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
            <input
              id="bordered-radio-2"
              type="radio"
              value="omat"
              name="recipes"
              checked={recipestate === "omat"}
              onChange={(e) => setRecipestate(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Omat reseptit
            </label>
          </div>
        
    
        </div>
      )}

      {recipestate === 'kaikki' ? (
        <h1 className="text-3xl text-center mb-10 mt-10">Kaikki reseptit <span className="ml-5 text-2xl">{recipes.length} reseptiä</span></h1>
      ): (
        <h1 className="text-3xl text-center mb-10 mt-10">Omat reseptit</h1>
      )}

      {error !== '' && (
        <p className="text-red-600 text-2xl text-center">{error}</p>
      )}

      <div className="flex flex-wrap gap-10 items-center justify-center lg:justify-start">
        {recipestate === "kaikki" ? (
          recipes.map((recipe) => 
            <RecipeCard key={recipe.id} recipe={recipe} />
          )
        ) : (
          recipes
            .filter((recipe) => recipe.user.id === user.userId)
            .map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
        )}
      </div>

      
    </div>
  )
}

export default Recipes