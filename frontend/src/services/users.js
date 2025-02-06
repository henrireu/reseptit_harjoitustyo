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
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newUser, config)

  return response.data
}

export { getAll, create }