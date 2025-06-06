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

  const [recipestate2, setRecipestate2] = useState('uusimmat')

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

      <div className="flex justify-center gap-10 mb-5">
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

      {/*<div className="flex gap-10 justify-center mb-5">
        <div className="flex items-center">
          <input
            id="radio-uusimmat"
            type="radio"
            value="uusimmat"
            name="sort-option"
            checked={recipestate2 === 'uusimmat'}
            onChange={() => setRecipestate2('uusimmat')}
            className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-uusimmat"
            className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
          Uusimmat
          </label>
        </div>

        <div className="flex items-center me-4">
          <input
            id="radio-suosituimmat"
            type="radio"
            value="suosituimmat"
            name="colored-radio"
            checked={recipestate2 === 'suosituimmat'}
            onChange={() => setRecipestate2('suosituimmat')}
            className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-suosituimmat"
            className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
          Suosituimmat
          </label>
        </div>
      </div>*/}

      <div className="flex gap-10 justify-center mb-5">
        <div className="inline-flex items-center">
          <label className="relative flex items-center cursor-pointer" htmlFor="uusimmat">
            <input
              name="sort-option"
              value="uusimmat"
              checked={recipestate2 === 'uusimmat'}
              onChange={() => setRecipestate2('uusimmat')}
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none bg-orange-300 rounded-full border border-slate-300 checked:border-slate-400 transition-all"
              id="uusimmat"
            />
            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          </label>
          <label className="ml-2 text-slate-600 cursor-pointer text-md font-medium" htmlFor="html">Uusimmat</label>
        </div>

        <div className="inline-flex items-center">
          <label className="relative flex items-center cursor-pointer" htmlFor="suosituimmat">
            <input
              name="sort-option"
              value="suosituimmat"
              checked={recipestate2 === 'suosituimmat'}
              onChange={() => setRecipestate2('suosituimmat')}
              type="radio"
              className="peer h-5 w-5 cursor-pointer appearance-none bg-orange-300 rounded-full border border-slate-300 checked:border-slate-400 transition-all"
              id="suosituimmat"
            />
            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          </label>
          <label className="ml-2 text-slate-600 cursor-pointer text-md font-medium" htmlFor="react">Suosituimmat</label>
        </div>
      </div>

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
            .sort((a, b) => {
              if (recipestate2 === 'suosituimmat') {
                return (b.averageRating || 0) - (a.averageRating || 0)
              }
              return 0
            })
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
    <form className="max-w-xl mx-auto mb-5">
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