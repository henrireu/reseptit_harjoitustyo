import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { setUser } from "./reducers/userSlice"
import { setToken } from "./services/recipes"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import Login from "./components/login"
import AddRecipe from "./pages/addRecipe"
import SignUp from "./pages/signUp"
import SingleRecipePage from "./pages/singleRecipePage"
import Recipes from "./pages/recipes"

const App = () => {
  const showLoginForm = useSelector(state => state.showLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedRecipeAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Navbar />

      {showLoginForm && (
        <Login />
      )}

      <Routes>
        <Route path='/reseptit/:id' element={<SingleRecipePage />} />
        <Route path='/' element={<Home />} />
        <Route path='/reseptit' element={<Recipes />} />
        <Route path='/luo-resepti' element={<AddRecipe />} />
        <Route path='/luo-tili' element={<SignUp />} />
      </Routes>
      
    </div>
  )
}

export default App
