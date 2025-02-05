import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/navbar"
import Home from "./pages/home"
import AllRecipes from "./pages/allRecipes"
import Login from "./components/login"

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <div>
      <Navbar setShowLoginForm={setShowLoginForm} user={user} setUser={setUser}/>

      {showLoginForm && (
        <Login setShowLoginForm={setShowLoginForm} setUser={setUser}/>
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-recipes' element={<AllRecipes />} />
      </Routes>
      
    </div>
  )
}

export default App
