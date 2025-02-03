import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
    console.log(request.data)
  } catch (error) {
    console.error(error)
  }
}

export { getAll }