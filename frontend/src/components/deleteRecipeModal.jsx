import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast'

import { deleteRecipe } from "../services/recipes"

const DeleteRecipeModal = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  const onDelete = async () => {
    console.log(recipe)
    try {
      await deleteRecipe(recipe.id)
    } catch(error) {
      console.error(error)
      toast.error('Jokin meni vikaan')
    } finally {
      toast.success("Resepti poistettiin onnistuneesti", {
        position: "bottom-center",
      })
          
      setTimeout(() => {
        navigate('/')
      },4000)
    }
  }

  return (
    <>
      <Toaster />
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:cursor-pointer transition"
      >
        Poista resepti
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold">Oletko varma?</h2>
            <p className="text-gray-600 my-1">Haluatko varmasti poistaa reseptin:</p>
            <p className="text-gray-600 text-lg my-1 font-bold">{recipe.name}</p>
            <p className="text-gray-600 my-1">Tätä toimintoa ei voi perua.</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Peruuta
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 hover:cursor-pointer transition"
              >
                Poista
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteRecipeModal