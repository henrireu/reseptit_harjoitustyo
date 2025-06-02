import { useState } from "react"
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { login } from "../services/login"
import { setUser } from "../reducers/userSlice"
import { create } from "../services/users"
import { setToken } from "../services/recipes"
import Input from "../components/input"
import Button from "../components/button"

import avatarMan from "../assets/chefman.png"
import avatarWoman from "../assets/chefwoman.png"
import avatarMan2 from "../assets/chefman2.png"
import avatarDog from "../assets/dog.png"

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState(0)
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isValidPassword = (password) => {
    return /^(?=.*[\d!@#$%^&*]).{6,}$/.test(password);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(username.length >= 15) {
      toast.error('Käyttäjänimen maksimi pituus on 15 merkkiä.')
      return
    }
    if(password !== confirmPassword) {
      toast.error('Salasanat eivät täsmää!')
      return
    }
    if(!isValidPassword(password)) {
      toast.error('Salasanan tulee olla vähintään 5 merkkiä pitkä ja sisältää vähintään yksi numero tai erikoismerkki.')
      return
    }
    if(avatar === 0) {
      toast.error('Sinun täytyy valita avatar!')
      return
    }
    
    setLoading(true)
    try {
      await create({
        username: username,
        name: name,
        password: password,
        avatarId: avatar
      })

      try {
        const user = await login({
          username, password
        })
        setButtonDisabled(true)
        dispatch(setUser(user))
        setToken(user.token)
        toast.success(`Käyttäjä ${username} luotu onnistuneesti`)
        setUsername('')
        setName('')
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } catch(error) {
        console.error(error)
      }

    } catch (error) {
      console.error(error.message)
  
      if (error.message.includes("expected `username` to be unique")) {
        toast.error('Käyttäjänimi on varattu')
      } else {
        toast.error(`Error: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <div className="pt-[100px] px-10 mb-10">
        <h1 className="text-3xl mb-7 text-center">Luo tili</h1>
        <Toaster />
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">

          {/*avatar section */}
          <div className="mb-5">
            <AvatarSelection avatar={avatar} setAvatar={setAvatar}/>
          </div>
        
          <div className="mb-5">
            <Input 
              label="Käyttäjänimi*"
              type="text"
              placeholder="Käyttäjänimi"
              required={true}
              value={username}
              setValue={setUsername}
            />
          </div>

          <div className="mb-5">
            <Input 
              label="Koko nimesi*" 
              type="text" 
              placeholder="Koko nimesi" 
              required={true} 
              value={name} 
              setValue={setName} 
            />
          </div>

          <div className="mb-5">
            <Input 
              label="Salasana*" 
              type="password" 
              placeholder="Salasana" 
              required={true} 
              value={password} 
              setValue={setPassword} 
            />
          </div>

          <div className="mb-5">
            <Input 
              label="Vahvista salasana*" 
              type="password" 
              placeholder="Vahvista salasana" 
              required={true} 
              value={confirmPassword} 
              setValue={setConfirmPassword} 
            />
          </div>

          <Button text="Luo tili" type="submit" width="w-[100px]" color="gold" disabled={buttonDisabled} loading={loading} />

        </form>

      </div>
      <div className="fixed bottom-0 w-full text-center bg-white">
        <a href="https://www.flaticon.com/free-icons/chef" title="chef icons">Chef icons created by Freepik - Flaticon</a> 
      </div>
    </>
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

export default SignUp