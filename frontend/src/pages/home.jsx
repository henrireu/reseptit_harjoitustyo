import { useState, useEffect } from "react"

import recipeImage from "../assets/reseptikuva.jpg"
import { getLatestRecipes } from "../services/recipes"
import RecipeCard from "../components/recipeCard"
import LoadingSpinner from "../components/loadingSpinner"

const Home = () => {
  const [latestRecipes, setLatestRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getLatest = async () => {
      try {
        const recipes = await getLatestRecipes()
        setLatestRecipes(recipes)
      } catch(error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getLatest()
  },[])

  return (
    <div className="pt-[150px] px-10 max-w-[1200px] mx-auto pb-10">

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 pb-10 border-b border-gray-500 dark:border-white">
        <img src={recipeImage} alt="resepti kuva" className="w-full sm:w-1/2"/>
        <div className="w-full sm:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold">Tervetuloa!</h2>
          <p className="text-xl md:text-2xl mt-10">
            Tallenna omat suosikkireseptisi ja inspiroidu muiden luomuksista. Löydä, kokeile ja jaa uusia makuelämyksiä helposti!
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-semibold mt-10 text-center">Uusimmat reseptit</h2>
        {loading && (
          <div className="flex justify-center items-center mt-[50px]">
            <LoadingSpinner size="big" />
          </div>
          
        )}

        <div className="flex flex-wrap gap-10 items-center justify-center mt-10">
          {latestRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

      </div>

    </div>
  )
}

export default Home