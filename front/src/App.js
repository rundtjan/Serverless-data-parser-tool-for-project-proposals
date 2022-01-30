import './App.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

//Components
import DemoHome from './components/DemoHome'
//Actions
import { initializeMessages } from './reducers/dataReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMessages())
  }, [dispatch])

  return (
    <div className="App">
      <DemoHome />
    </div>
  )
}

export default App
