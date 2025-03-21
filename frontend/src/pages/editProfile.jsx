import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../services/users'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../reducers/userSlice'
import { setToken } from '../services/recipes'
import LoadingButton from '../components/loadingButton'

const EditProfile = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [loading, setLoading] = useState(false)


  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="pt-[200px] text-center">
        <p>Et ole kirjautunut. Kirjaudu sisään, jotta voit muokata profiiliasi.</p>
      </div>
    );
  }

  const handleDeleteProfile = async () => {
    setLoading(true)
    try {
      await deleteUser(user.userId)
      toast.success('Käyttäjä poistettu onnistuneesti.')

      setTimeout(() => {
        dispatch(setUser(null))
        window.localStorage.removeItem('loggedRecipeAppUser')
        setToken(null)
        navigate('/')
      }, 3000)
      
    } catch(error) {
      toast.error('Jokin meni vikaan.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-[150px] flex justify-center gap-10 text-xl">
      <Toaster />
      <div className="">
        <p className="mb-3">Käyttäjänimi:</p>
        <p className="mb-3">Oikea nimi:</p>
        <button 
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 cursor-pointer"
          onClick={() => setShowConfirmationModal(true)}
        >
        Poista profiili 
        </button>
      </div>
      <div className="">
        <p className="mb-3">{user.username}</p>
        <p>{user.name}</p>
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[290px] sm:w-[380px]">
            <h3 className="text-lg text-center mb-4">
              Oletko varma, että haluat poistaa profiilisi?
              <br />
              <span className="text-sm text-gray-500">
                Kaikki luomasi reseptit poistetaan myös lopullisesti.
              </span>
            </h3>
            <div className="flex justify-between gap-4 text-base">
              {loading === true ? (
                <LoadingButton width={120}/>
              ): (
                <button
                  onClick={handleDeleteProfile}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer w-[120px]"
                >
                Kyllä, poista
                </button>
              )}
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer"
              >
                Peruuta
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
  
}

export default EditProfile