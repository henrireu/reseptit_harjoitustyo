import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getAllRecipes } from "../services/recipes"

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const allRecipes = await getAllRecipes()
        setRecipes(allRecipes)
      } catch (error) {
        console.error('Error fetching recipes:', error.message)
      }
    }

    getRecipes()
  }, [])

  return (
    <div className="mt-[100px] px-10">
      <h1 className="text-3xl text-center mb-10">All recipes</h1>
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {recipes.map(recipe => (
          <SingleRecipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

const SingleRecipe = ({ recipe }) => {
  const handleClick = () => {
    console.log(recipe)
  }
  return (
    <div 
      className="w-1/1 sm:w-1/4 bg-gray-100 rounded-lg shadow-md max-w-[200px] pb-4 hover:cursor-pointer"
      onClick={handleClick}
    >
      <Link to={`/all-recipes/${recipe.id}`}>
        <img src={recipe.imageUrl} className="w-full h-[200px]"/>
        <p className="text-center mt-4 font-semibold">{recipe.name}</p>
      </Link>
    </div>
  )
}

export default AllRecipes