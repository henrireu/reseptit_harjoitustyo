import axios from 'axios'
import handleAxiosError from './errorHandling'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
    console.log(request.data)
  } catch (error) {
    handleAxiosError(error)
  }
}

const getUser = async id => {
  try {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const create = async newUser => {
  try {
    const response = await axios.post(baseUrl, newUser)
  
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }

}

export { getAll, create, getUser }