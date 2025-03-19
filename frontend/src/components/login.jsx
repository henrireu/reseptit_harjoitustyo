import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/login"
import { setToken } from "../services/recipes"
import { useDispatch } from 'react-redux'
import { setUser } from "../reducers/userSlice"
import { setShowLogin } from "../reducers/showLoginSlice"
import LoadingButton from "./loadingButton"

const Login = () => {
  const dispatch = useDispatch()

  const handleExit = () => {
    dispatch(setShowLogin(false))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white mx-6 mt-[50px] p-4 rounded-lg shadow-lg max-w-[600px] w-full">
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
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Käyttäjänimi*</label>
        <input 
          type="text" 
          id="username" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Käyttäjänimi" 
          required 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salasana*</label>
        <input 
          type="password" 
          id="password" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          required 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <div className="h-[20px] flex items-center mb-2">
        {error !== "" && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}
      </div>

      {loading ? (
        <LoadingButton />
      ) : (
        <button 
          type="submit" 
          className="mb-5 w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
        >Kirjaudu</button>
      )}

      <p className="text-md font-light text-gray-500 dark:text-gray-400">
          Eikö sinulla ole vielä tiliä?
        <a 
          href="#" 
          className="font-medium text-blue-700 hover:underline dark:text-primary-500 ml-2"
          onClick={handleSignup}
        >
          Rekisteröidy
        </a>
      </p>
    </form>
  )
}

export default Login