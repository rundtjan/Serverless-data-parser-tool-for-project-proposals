import React from 'react'

//import Container from '@mui/material/Container'
import { Grid } from '@mui/material'

import { useSelector } from 'react-redux'


import Messages from '../components/Messages'
import Words from '../components/Words'
import UserForm from '../components/UserForm'
import CategoryWords from '../components/CategoryWords'

const HomePage = () => {
  const categories = useSelector(state => state.data.categories)

  const addCategories = () => {
    const categoryElement = categories.map(cat => <Grid key={cat + 'griditem'} item><CategoryWords key={cat + 'cat'} category={cat} /></Grid>)
    return categoryElement
  }

  return(
    <Grid container direction='row'>
      <Grid container item justifyContent='center'>
        <Grid item>
          <UserForm />
        </Grid>
        <Grid item>
          <Messages />
        </Grid>
        <Grid item>
          <Words />
        </Grid>
      </Grid>
      <Grid container item justifyContent='center'>
        { categories ? addCategories() : null }
      </Grid>
    </Grid>
  )
}

export default HomePage