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
  console.log('new recipe', newRecipe)

  const formData = new FormData()
  formData.append("image", newRecipe.imageFile)
  formData.append("name", newRecipe.name)
  formData.append("ingredients", JSON.stringify(newRecipe.ingredients))
  formData.append("instructions", JSON.stringify(newRecipe.instructions))

  try {
    const config = {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: token 
      },
    }

    const response = await axios.post(baseUrl, formData, config)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

export { create, getAllRecipes, setToken }