import { useEffect } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { toast, Toaster } from 'react-hot-toast'

import { setUser } from "./reducers/userSlice"
import { setToken } from "./services/recipes"
import { setShowLogin } from "./reducers/showLoginSlice"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import Login from "./components/login"
import AddRecipe from "./pages/addRecipe"
import SignUp from "./pages/signUp"
import SingleRecipePage from "./pages/singleRecipePage"
import Recipes from "./pages/recipes"
import EditRecipe from "./pages/editRecipe"

const App = () => {
  const showLoginForm = useSelector(state => state.showLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedRecipeAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const decodedToken = jwtDecode(user.token)
      const currentDate = new Date()
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //token vanhentunut
        dispatch(setUser(null))
        setToken(null)
        window.localStorage.removeItem('loggedRecipeAppUser')
        navigate('/')
        toast.error('Kirjautumisistunto on vanhentunut, kirjaudu sisään uudestaan.')
        setTimeout(() => {
          dispatch(setShowLogin(true))
        }, 3000)
      } else {
        dispatch(setUser(user))
        setToken(user.token)
      }
    }
  }, [location])

  return (
    <div className="text-gray-900 min-h-screen">
      <Navbar />
      <Toaster />
      {showLoginForm && (
        <Login />
      )}

      <Routes>
        <Route path='/reseptit/:id' element={<SingleRecipePage />} />
        <Route path='/reseptit/:id/muokkaa' element={<EditRecipe />} />
        <Route path='/' element={<Home />} />
        <Route path='/reseptit' element={<Recipes />} />
        <Route path='/luo-resepti' element={<AddRecipe />} />
        <Route path='/luo-tili' element={<SignUp />} />
      </Routes>
      
    </div>
  )
}

export default App
