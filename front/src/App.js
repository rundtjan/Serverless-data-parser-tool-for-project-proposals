import './App.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

//Styles
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from './styles/theme'

//Components
import Layout from './components/Layout'

//Pages
import HomePage from './pages/HomePage'

//Actions
import { initializeMessages } from './reducers/dataReducer'
import { initializeChannels } from './reducers/channelReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMessages())
    dispatch(initializeChannels())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <HomePage />
      </Layout>
    </ThemeProvider>
  )
}

export default App
