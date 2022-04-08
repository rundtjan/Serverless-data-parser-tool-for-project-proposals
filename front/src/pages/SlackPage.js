import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

//Mui components
import Grid from '@mui/material/Grid'

//Components
import Messages from '../components/Messages'
import Words from '../components/Words'
import Categories from '../components/Categories'
import Layout from '../components/Layout'

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
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Messages />
        </Grid>
        <Grid item xs={4}>
          <Words />
        </Grid>
        <Categories />
      </Grid>
    </Layout>
  )
}

export default SlackPage