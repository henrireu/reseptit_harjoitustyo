import axios from 'axios'
import handleAxiosError from './errorHandling'
import { getToken } from './recipes'

const apiUrl = import.meta.env.VITE_API_URL
const baseUrl = `${apiUrl}/api/reviews`

//kaikki reviewsit mutta tämä ei varmaan jää
const getAllReviews = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

const getRecipeReviews = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

const createReview = async (review) => {
  const token = getToken()

  try {
    const config = {
      headers: { 
        "Content-Type": "application/json", 
        Authorization: token 
      }
    }

    const response = await axios.post(baseUrl, review, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export { getAllReviews, getRecipeReviews, createReview }