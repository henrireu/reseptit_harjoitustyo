import { createSlice } from '@reduxjs/toolkit'

export const showLoginSlice = createSlice({
  name: 'showLogin',
  initialState: false,
  reducers: {
    setShowLogin: (state, action) => action.payload
  }
})

export const { setShowLogin } = showLoginSlice.actions
export default showLoginSlice.reducer