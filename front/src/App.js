import './App.css'
import React from 'react'

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

//Styles
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from './styles/theme'


//Pages
import HomePage from './pages/HomePage'
import SlackPage from './pages/SlackPage'

//Actions

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/:id' element={<SlackPage />}/>
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
