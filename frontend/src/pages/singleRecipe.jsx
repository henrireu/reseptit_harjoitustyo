import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleRecipe } from "../services/recipes"

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await getSingleRecipe(id)
        console.log(recipe)
        setRecipe(recipe)
      } catch(error) {
        console.error(error)
      }
    }

    getRecipe()
  }, [])

  if (!recipe) {
    return (
      <div className="mt-[100px]">
        loading...
      </div>
    )
  }

  return (
    <div className="mt-[100px] px-10">
      <h1 className="text-3xl text-center">{recipe.name}</h1>
    </div>
  )
}

export default SingleRecipe