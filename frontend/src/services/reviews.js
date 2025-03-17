import axios from 'axios'
import handleAxiosError from './errorHandling'

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

export { getAllReviews }