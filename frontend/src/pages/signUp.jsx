import { useState } from "react"
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { login } from "../services/login"
import { setUser } from "../reducers/userSlice"
import { create } from "../services/users"
import LoadingButton from "../components/loadingButton"
import { setToken } from "../services/recipes"
import Input from "../components/input"

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isValidPassword = (password) => {
    return /^(?=.*[\d!@#$%^&*]).{6,}$/.test(password);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      toast.error('Salasanat eivät täsmää!')
      return
    }
    if(!isValidPassword(password)) {
      toast.error('Salasanan tulee olla vähintään 5 merkkiä pitkä ja sisältää vähintään yksi numero tai erikoismerkki.')
      return
    }
    
    setLoading(true)
    try {
      await create({
        username: username,
        name: name,
        password: password
      })

      try {
        const user = await login({
          username, password
        })
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
    <div className="pt-[100px] px-10">
      <h1 className="text-3xl mb-7 text-center">Luo tili</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">

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

        {loading === true ? (
          <LoadingButton />
        ) : (
          <button 
            type="submit" 
            className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          >Luo tili</button>
        )}

      </form>
    </div>
  )
}

export default SignUp