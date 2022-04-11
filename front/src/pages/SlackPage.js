import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

//Components
import PageLayout from '../components/Page/PageLayout'

//Reducers
import { getParamMessages } from '../reducers/dataReducer'
import { clearAllHighlights } from '../reducers/highlightReducer'
import { setResponseTarget } from '../reducers/responseTargetReducer'


const SlackPage = () => {
  const id = useParams().id.toString()
  const dispatch = useDispatch()

  dispatch(getParamMessages(id))
  dispatch(setResponseTarget(id))
  dispatch(clearAllHighlights())

  return(
    <PageLayout />
  )
}

export default SlackPage