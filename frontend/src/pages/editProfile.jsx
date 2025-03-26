import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../services/users'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../reducers/userSlice'
import { setToken } from '../services/recipes'
import Button from '../components/button'

const EditProfile = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

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
      setButtonDisabled(true)

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
        <Button handleClick={() => setShowConfirmationModal(true)} text="Poista profiili" type="button" color="red" /> 
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
              <Button handleClick={handleDeleteProfile} type="button" text="Kyllä, poista" width="w-[120px]" color="red" disabled={buttonDisabled} loading={loading} />
              <Button handleClick={() => setShowConfirmationModal(false)} text="Peruuta" type="button" color="gray" />
            </div>
          </div>
        </div>
      )}

    </div>
  )
  
}

export default EditProfile