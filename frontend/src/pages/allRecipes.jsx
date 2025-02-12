import { useEffect, useState } from "react"
import { getAllRecipes } from "../services/recipes"

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const allRecipes = await getAllRecipes()
        console.log('all recipes',allRecipes)
        setRecipes(allRecipes)
      } catch (error) {
        console.error('Error fetching recipes:', error.message)
      }
    }

    getRecipes()
  }, [])

  return (
    <div className="mt-[100px] px-10">
      <h1 className="text-3xl">All recipes</h1>
      {recipes.map(recipe => (
        <SingleRecipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

const SingleRecipe = ({ recipe }) => {
  return (
    <div>
      <img src={recipe.imageUrl} style={{ width: 200, height: 200}}/>
      {recipe.name}
    </div>
  )
}

export default AllRecipes