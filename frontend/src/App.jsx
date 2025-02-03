import { useEffect } from "react"
import { getAll } from "./services/users"

const App = () => {

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className="ext-3xl font-bold underline">moro</div>
  )
}

export default App
