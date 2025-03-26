import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/login"
import { setToken } from "../services/recipes"
import { useDispatch } from 'react-redux'
import { setUser } from "../reducers/userSlice"
import { setShowLogin } from "../reducers/showLoginSlice"
import Input from "./input"
import Button from "./button"

const Login = () => {
  const dispatch = useDispatch()

  const handleExit = () => {
    dispatch(setShowLogin(false))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-white/50">
      <div className="bgg-white bg-orange-100 dark:bg-gray-700 mx-6 mt-[50px] p-4 rounded-lg shadow-lg max-w-[600px] w-full">
        <div className="flex justify-end">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-6 hover:cursor-pointer"
            onClick={handleExit}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <LoginForm />
      </div> 
    </div>
  )
}

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const user = await login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedRecipeAppUser', JSON.stringify(user)
      )

      setToken(user.token)
      
      dispatch(setUser(user))
      dispatch(setShowLogin(false))
      navigate('/')
    } catch(error) {
      console.error(error)
      if (error.response && error.response.status === 401) {
        setError('Väärä käyttäjänimi tai salasana')
      } else {
        setError('Nettiyhteydessä on vikaa tai jokin muu virhe')
      }
      setTimeout(() => {
        setError('')
      }, 6000)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = () => {
    dispatch(setShowLogin(false))
    navigate('/luo-tili')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="mb-5">
        <Input 
          label="Käyttäjänimi"
          type="text"
          placeholder="Käyttäjänimi"
          required={true}
          value={username}
          setValue={setUsername}
        />
      </div>

      <div className="mb-3">
        <Input 
          label="Salasana"
          type="password"
          placeholder="Salasana"
          required={true}
          value={password}
          setValue={setPassword}
        />
      </div>

      <div className="h-[20px] flex items-center mb-2">
        {error !== "" && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}
      </div>

      <Button text="Kirjaudu" type="submit" color="gold" width="w-[100px]" loading={loading} />

      <p className="text-md mt-5 font-light text-gray-800 dark:text-gray-400">
          Eikö sinulla ole vielä tiliä?
        <a 
          href="#" 
          className="font-medium text-orange-700 hover:underline dark:text-primary-500 ml-2"
          onClick={handleSignup}
        >
          Rekisteröidy
        </a>
      </p>
    </form>
  )
}

export default Login