import axios from 'axios'

const handleAxiosError = (error) => {
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

export default handleAxiosError