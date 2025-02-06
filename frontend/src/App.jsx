import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

import Navbar from "./components/navbar"
import Home from "./pages/home"
import AllRecipes from "./pages/allRecipes"
import Login from "./components/login"

const App = () => {
  const showLoginForm = useSelector(state => state.showLogin)

  return (
    <div>
      <Navbar />

      {showLoginForm && (
        <Login />
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-recipes' element={<AllRecipes />} />
      </Routes>
      
    </div>
  )
}

export default App
