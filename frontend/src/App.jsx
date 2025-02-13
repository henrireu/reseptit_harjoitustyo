import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { setUser } from "./reducers/userSlice"
import { setToken } from "./services/recipes"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import AllRecipes from "./pages/allRecipes"
import Login from "./components/login"
import AddRecipe from "./pages/addRecipe"
import SignUp from "./pages/signUp"
import OwnRecipes from "./pages/ownRecipes"
import SingleRecipePage from "./pages/singleRecipePage"

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
        <Route path='/all-recipes/:id' element={<SingleRecipePage />} />
        <Route path='/' element={<Home />} />
        <Route path='/all-recipes' element={<AllRecipes />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/own-recipes' element={<OwnRecipes />} />
      </Routes>
      
    </div>
  )
}

export default App
