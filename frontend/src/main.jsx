import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'

import userReducer from './reducers/userSlice.js'
import showLoginReducer from './reducers/showLoginSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    showLogin: showLoginReducer
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
)
