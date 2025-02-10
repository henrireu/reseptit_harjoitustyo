import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/login"
import { setToken } from "../services/recipes"
import { useDispatch } from 'react-redux'
import { setUser } from "../reducers/userSlice"
import { setShowLogin } from "../reducers/showLoginSlice"

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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

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
    } catch(error) {
      console.error(error)
    }
  }

  const handleSignup = () => {
    dispatch(setShowLogin(false))
    navigate('/signup')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto">

      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username*</label>
        <input 
          type="text" 
          id="username" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="username" 
          required 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password*</label>
        <input 
          type="password" 
          id="password" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          required 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button 
        type="submit" 
        className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
      >Submit</button>

      <p className="text-md font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet? 
        <a 
          href="#" 
          className="font-medium text-blue-700 hover:underline dark:text-primary-500 ml-2"
          onClick={handleSignup}
        >
          Sign up
        </a>
      </p>
    </form>
  )
}

export default Login