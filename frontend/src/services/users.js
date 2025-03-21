import axios from 'axios'
import handleAxiosError from './errorHandling'
import { getToken } from './recipes'

const apiUrl = import.meta.env.VITE_API_URL
const baseUrl = `${apiUrl}/api/users`

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

const deleteUser = async userId => {
  const token = getToken()
  try {
    const config = {
      headers: { 
        "Content-Type": "application/json", 
        Authorization: token 
      }
    }

    const response = await axios.delete(`${baseUrl}/${userId}`, config)
    
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

export { getAll, create, getUser, deleteUser }