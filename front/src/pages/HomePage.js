import React from 'react'
import { useDispatch } from 'react-redux'

//Components
import PageLayout from '../components/Page/PageLayout'

import { initializeMessages } from '../reducers/dataReducer'
import { clearAllHighlights } from '../reducers/highlightReducer'



const HomePage = () => {

  const dispatch = useDispatch()

  dispatch(initializeMessages())
  dispatch(clearAllHighlights())


  return(
    <PageLayout />
  )
}

export default HomePage