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

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

        <Button text="Luo tili" type="submit" width="w-[100px]" color="gold" disabled={buttonDisabled} loading={loading} />

      </form>
    </div>
  )
}

export default SignUp