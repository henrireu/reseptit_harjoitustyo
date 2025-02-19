import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { getSingleRecipe } from "../services/recipes"
import { getUser } from "../services/users"
import DeleteRecipeModal from "../components/deleteRecipeModal"
import ErrorComponent from "../components/errorComponent"
import LoadingPage from "../components/loadingPage"

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState(null)
  const [owner, setOwner] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await getSingleRecipe(id)
        //haetaan username api kutsulla
        const userObject = await getUser(recipe.user)
        setRecipe({
          ...recipe,
          username: userObject.username
        })
        setError('')
        if (user && recipe?.user === user.userId) {
          setOwner(true)
        } else {
          setOwner(false)
        }
      } catch(error) {
        console.error(error)
        setError('virhe')
      } finally {
        setLoading(false)
      }
    }

    getRecipe()
  }, [id, user])

  if (loading) {
    return (
      <LoadingPage />
    )
  }

  if (error !== '') {
    return (
      <ErrorComponent />
    )
  }

  return (
    <div className="mt-[80px] max-w-[1600px] mx-auto pb-10">
      <img src={recipe.imageUrl} className="w-full h-[calc(100vh-300px)] object-cover"/>
      <div className="px-2 sm:px-10 mt-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center">{recipe.name}</h1>

        <Owner owner={owner} />
        
        <div className="max-w-[1400px] mx-auto mt-10 bg-gray-100 p-6">

          <div className="flex mb-4 items-center justify-between">

            <div className="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <div className="font-semibold">{recipe.username}</div>
            </div>

            {owner === true && (
              <div className="flex gap-3">
                <div className="relative group">
                  <Link to={`/reseptit/${id}/muokkaa`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-md text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Muokkaa reseptiä
                    </span>
                  </Link>
                </div>

                <DeleteRecipeModal recipe={recipe} />
              </div>
            )}
        
          </div>

          <div className="flex flex-col sm:flex-row px-1 sm:px-6 gap-2">
            <Ingredients ingredients={recipe.ingredients}/>
            <Instructions instructions={recipe.instructions}/>
          </div>
        </div>

      </div>
    </div>
  )
}

const Ingredients = ({ ingredients }) => {
  return (
    <div className="w-full sm:w-1/2">
      <h2 className="text-2xl font-semibold mb-5">Ainekset</h2>
      {ingredients.map(ingredient => (
        <p 
          key={ingredient.ingredient}
          className="text-lg ml-2 mb-2"
        >
          - {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
        </p>
      ))}
    </div>
  )
}

const Instructions = ({ instructions }) => {
  return (
    <div className="w-full sm:w-1/2">
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
      <div>

        <div className="mt-5 bg-green-100 p-2 w-[200px] mx-auto flex items-center justify-center gap-2 rounded-full">
          <p className="text-lg text-center">Reseptin tekijä</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

        </div>
      </div>
      
    )
  }
}

export default SingleRecipePage