import axios from 'axios'
import handleAxiosError from './errorHandling'
const baseUrl = 'http://localhost:3001/api/recipes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllRecipes = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

const create = async newRecipe => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newRecipe, config)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

export { create, getAllRecipes, setToken }