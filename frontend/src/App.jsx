import { useEffect } from "react"
import { getAll } from "./services/users"

import Navbar from "./components/navbar"

const App = () => {

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App
