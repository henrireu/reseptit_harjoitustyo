import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast'

import { deleteRecipe } from "../services/recipes"
import LoadingButton from "./loadingButton"
import Button from "./button"

const DeleteRecipeModal = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const navigate = useNavigate()

  const onDelete = async () => {
    setLoading(true)
    try {
      await deleteRecipe(recipe.id)
      toast.success("Resepti poistettiin onnistuneesti", {
        position: "bottom-center",
      })
      setButtonDisabled(true)
          
      setTimeout(() => {
        navigate('/')
      },4000)
    } catch(error) {
      console.error(error)
      toast.error('Jokin meni vikaan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toaster />
      <div 
        onClick={() => setIsOpen(true)}
        className="relative group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-md text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Poista resepti
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold">Oletko varma?</h2>
            <p className="text-gray-600 my-1">Haluatko varmasti poistaa reseptin:</p>
            <p className="text-gray-600 text-lg my-1 font-bold">{recipe.name}</p>
            <p className="text-gray-600 my-1">Tätä toimintoa ei voi perua.</p>
            <div className="flex justify-between mt-4">
              <Button handleClick={() => setIsOpen(false)} type="button" text="Peruuta" color="gray" width="w-[100px]"/>
              {loading ? (
                <LoadingButton color="red" width="w-[100px]"/>
              ) : (
                <Button handleClick={onDelete} type="button" text="Poista" color="red" width="w-[100px]" disabled={buttonDisabled} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteRecipeModal