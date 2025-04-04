import axios from 'axios'
import handleAxiosError from './errorHandling'
//const baseUrl = 'http://localhost:3001/api/recipes'
const apiUrl = import.meta.env.VITE_API_URL
const baseUrl = `${apiUrl}/api/recipes`

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getAllRecipes = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

const getSingleRecipe = async id => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

const getLatestRecipes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/latest`)
    return response.data
  } catch(error) {
    handleAxiosError(error)
  }
}

const create = async newRecipe => {
  const formData = new FormData()
  formData.append("image", newRecipe.imageFile)
  formData.append("name", newRecipe.name)
  formData.append("timeUsed", newRecipe.timeUsed)
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

const deleteRecipe = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    await axios.delete(`${baseUrl}/${id}`, config)
  } catch (error) {
    handleAxiosError(error)
  }
}

const editRecipe = async (id, recipe) => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${id}`, recipe, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const editRecipeWithImage = async (id, recipe, imageName) => {
  const formData = new FormData()
  formData.append("image", recipe.imageFile)
  formData.append("name", recipe.name)
  formData.append("timeUsed", recipe.timeUsed)
  formData.append("ingredients", JSON.stringify(recipe.ingredients))
  formData.append("instructions", JSON.stringify(recipe.instructions))
  formData.append("oldImageName", imageName)

  try {
    const config = {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: token 
      },
    }

    const response = await axios.put(`${baseUrl}/${id}/image`, formData, config)
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export { create, getAllRecipes, getSingleRecipe, setToken, deleteRecipe, getLatestRecipes, editRecipe, editRecipeWithImage, getToken }