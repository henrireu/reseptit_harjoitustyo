import { useState } from "react"
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { login } from "../services/login"
import { setUser } from "../reducers/userSlice"
import { create } from "../services/users"

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
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
        console.log(user)
        toast.success(`User ${username} created succesfully`)
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
        toast.error('Username is already taken')
      } else {
        toast.error(`Error: ${error.message}`)
      }
    }
  }


  return (
    <div className="mt-[100px] px-10">
      <h1 className="text-3xl mb-7 text-center">Sign up</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">

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
          <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name*</label>
          <input 
            type="text" 
            id="fullname" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="full name" 
            required 
            value={name}
            onChange={({ target }) => setName(target.value)}
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

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password*</label>
          <input 
            type="password" 
            id="confirmPassword" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
        >Submit</button>

      </form>
    </div>
  )
}

export default SignUp