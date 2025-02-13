import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getSingleRecipe } from "../services/recipes"

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState(null)
  const [owner, setOwner] = useState(false)
  const { id } = useParams()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await getSingleRecipe(id)
        setRecipe(recipe)
        if (user && recipe.user === user.userId) {
          setOwner(true)
        } else {
          setOwner(false)
        }
      } catch(error) {
        console.error(error)
      }
    }

    getRecipe()
  }, [id, user])

  if (!recipe) {
    return (
      <div className="mt-[100px]">
        loading...
      </div>
    )
  }

  return (
    <div className="mt-[80px] max-w-[1600px] mx-auto">
      <img src={recipe.imageUrl} className="w-full h-[calc(100vh-300px)] object-cover"/>
      <div className="px-10 mt-10">
        <h1 className="text-5xl font-semibold text-center">{recipe.name}</h1>
        <Owner owner={owner} />
        
        <div className="flex max-w-[1400px] mx-auto mt-10 bg-gray-100 p-10">
          <Ingredients ingredients={recipe.ingredients}/>
          <Instructions instructions={recipe.instructions}/>
        </div>

      </div>
    </div>
  )
}

const Ingredients = ({ ingredients }) => {
  return (
    <div className="w-1/2">
      <h2 className="text-2xl font-semibold mb-5">Ainekset</h2>
      {ingredients.map(ingredient => (
        <p 
          key={ingredient.ingredient}
          className="text-lg ml-2 mb-2"
        >
          {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
        </p>
      ))}
    </div>
  )
}

const Instructions = ({ instructions }) => {
  return (
    <div className="w-1/2">
      <h2 className="text-2xl font-semibold mb-5">Ohjeet</h2>
      {instructions.map((instruction, index) => (
        <p
          key={instruction}
          className="text-lg ml-2 mb-2"
        >
          {index + 1}. {instruction}
        </p>
      ))}
    </div>
  )
}

const Owner = ({ owner }) => {
  if (owner) {
    return (
      <div className="mt-5 bg-green-100 p-2 w-[200px] mx-auto flex items-center justify-center gap-2 rounded-full">
        <p className="text-lg text-center">Reseptin tekijä</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </div>
    )
  }
}

export default SingleRecipePage