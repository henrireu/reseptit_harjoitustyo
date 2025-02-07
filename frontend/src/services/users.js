import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

let token = null

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
    console.log(request.data)
  } catch (error) {
    console.error(error)
  }
}

const create = async newUser => {
  try {

    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newUser, config)
  
    return response.data
  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message)

      if (error.response) {
        throw new Error(error.response.data.error || "Something went wrong")
      } else if (error.request) {
        throw new Error("No response from server.")
      } else {
        throw new Error("Error setting up request.")
      }
    } else {
      throw new Error("An unexpected error occurred.")
    }
  }

}

export { getAll, create }