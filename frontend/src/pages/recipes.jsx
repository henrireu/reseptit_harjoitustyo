import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import LoadingPage from "../components/loadingPage"
import { getAllRecipes } from "../services/recipes"
import RecipeCard from "../components/recipeCard"

const Recipes = () => {
  const [recipestate, setRecipestate] = useState('kaikki')
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    const getRecipes = async () => {
      setError('')
      try {
        const allRecipes = await getAllRecipes()
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
    <div className="pt-[100px] px-10 max-w-[1400px] mx-auto pb-10">

      <div className="flex justify-center gap-10 mb-10">
        <div 
          className={`cursor-pointer text-2xl font-medium pb-1 hover:border-b-2 ${
            recipestate === 'kaikki' && 'border-b-2'
          }`}
          onClick={() => setRecipestate('kaikki')}
        >
          <p>Kaikki reseptit</p>
        </div>

        <div 
          className={`cursor-pointer text-2xl font-medium pb-1 hover:border-b-2 ${
            recipestate === 'omat' && 'border-b-2'
          }`}
          onClick={() => setRecipestate('omat')}
        >
          <p>Omat reseptit</p>
        </div>
      </div>

      <SearchForm search={search} setSearch={setSearch}/>

      {error !== '' && (
        <p className="text-red-600 text-2xl text-center">{error}</p>
      )}

      <div className="flex flex-wrap gap-10 items-center justify-center">
        {recipestate === "kaikki" ? (
          recipes
            .filter((recipe) => 
              search.length > 2 
                ? recipe.name.toLowerCase().includes(search.toLowerCase()) 
                : true 
            )
            .map((recipe) => 
              <RecipeCard key={recipe.id} recipe={recipe} />
            )
        ) : recipestate === "omat" && user === null ? (
          <div className="text-xl w-full flex justify-center">
            <p className="bg-gray-200 p-4 rounded">Kirjaudu sisään nähdäksesi omat reseptit!</p>
          </div>
        ) : (
          recipes
            .filter((recipe) => recipe.user.id === user.userId)
            .filter((recipe) => 
              search.length > 2 
                ? recipe.name.toLowerCase().includes(search.toLowerCase()) 
                : true 
            )
            .map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
        )}
      </div>

      
    </div>
  )
}

const SearchForm = ({ search, setSearch }) => {
  return (
    <form className="max-w-xl mx-auto mb-10">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">

        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Etsi resepti..."
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />

      </div>
    </form>
  )
}

export default Recipes