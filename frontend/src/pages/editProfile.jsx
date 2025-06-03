import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, editUser } from '../services/users'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../reducers/userSlice'
import { setToken } from '../services/recipes'
import Button from '../components/button'

import avatarMan from "../assets/chefman.png"
import avatarWoman from "../assets/chefwoman.png"
import avatarMan2 from "../assets/chefman2.png"
import avatarDog from "../assets/dog.png"

const EditProfile = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [avatar, setAvatar] = useState(0)

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      setAvatar(user.avatarId)
    }
  }, [user])

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

  const handleEditProfile = async () => {
    setLoading(true)
    try {
      const updatedUser = await editUser(user.userId, avatar)

      const userWithToken = {
        ...updatedUser,
        token: user.token
      }

      dispatch(setUser(userWithToken))
      localStorage.setItem('loggedRecipeAppUser', JSON.stringify(userWithToken))

      toast.success('Avatar vaihdettu.')
      setButtonDisabled(true)

      setTimeout(() => {
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
    <div className="pt-[150px] flex flex-col justify-center items-center gap-10 text-xl">
      <Toaster />
      <AvatarSelection avatar={avatar} setAvatar={setAvatar} />
      <div className="">
        <div className="flex">
          <p className="mb-3">Käyttäjänimi:</p>
          <p className="mb-3 ml-3">{user.username}</p>
        </div>

        <div className="flex">
          <p>Oikea nimi:</p>
          <p className="ml-3">{user.name}</p>
        </div>

        <div className="flex mt-5">
          <Button handleClick={handleEditProfile} text="Tallenna" type="button" color="gold" loading={loading} width="w-[90px]"/>
          <div className="ml-5"> 
            <Button handleClick={() => setShowConfirmationModal(true)} text="Poista profiili" type="button" color="red" /> 
          </div>  
        </div>

      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[290px] sm:w-[380px]">
            <h3 className="text-lg text-center text-black mb-4">
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

const AvatarSelection = ({ avatar, setAvatar}) => {
  
  return (
    <div className="w-full flex flex-col items-center gap-5">

      <div className="flex justify-center items-center w-24 h-24 rounded-full bg-orange-200">
        {avatar === 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        ) : avatar === 1 ? (
          <img className="w-20 h-20 rounded-full p-1" src={avatarMan} alt="Rounded avatar" />
        ) : avatar === 2 ? (
          <img className="w-20 h-20 rounded-full p-1" src={avatarWoman} alt="Rounded avatar" />
        ) : avatar === 3 ? (
          <img className="w-20 h-20 rounded-full p-1" src={avatarMan2} alt="Rounded avatar" />
        ) : avatar === 4 ? (
          <img className="w-20 h-20 rounded-full p-1" src={avatarDog} alt="Rounded avatar" />
        ) : null}
       
      </div>

      <p className="font-semibold">Valitse avatar!</p>

      <div className="flex gap-2">
        <img 
          onClick={() => setAvatar(1)}
          src={avatarMan} alt="Rounded avatar"
          className={`w-12 h-12 rounded-full p-1 cursor-pointer 
            ${avatar === 1 ? 'bg-orange-300 ring-2 ring-orange-400' : 'bg-orange-200 hover:bg-orange-300'}`}
        />
        <img 
          onClick={() => setAvatar(2)}
          src={avatarWoman} alt="Rounded avatar"
          className={`w-12 h-12 rounded-full p-1 cursor-pointer 
            ${avatar === 2 ? 'bg-orange-300 ring-2 ring-orange-400' : 'bg-orange-200 hover:bg-orange-300'}`}
        />
        <img 
          onClick={() => setAvatar(3)}
          src={avatarMan2} alt="Rounded avatar"
          className={`w-12 h-12 rounded-full p-1 cursor-pointer 
            ${avatar === 3 ? 'bg-orange-300 ring-2 ring-orange-400' : 'bg-orange-200 hover:bg-orange-300'}`}
        />
        <img 
          onClick={() => setAvatar(4)}
          src={avatarDog} alt="Rounded avatar"
          className={`w-12 h-12 rounded-full p-1 cursor-pointer 
            ${avatar === 4 ? 'bg-orange-300 ring-2 ring-orange-400' : 'bg-orange-200 hover:bg-orange-300'}`}
        />
      </div>
     
    </div>
  )
}

export default EditProfile