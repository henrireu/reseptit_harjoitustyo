import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import showLoginReducer from './showLoginSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    showLogin: showLoginReducer,
  }
})