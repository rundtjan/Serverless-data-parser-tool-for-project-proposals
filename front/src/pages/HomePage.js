import React from 'react'

//Mui components
import Grid from '@mui/material/Grid'

//Components
import Messages from '../components/Messages'
import Words from '../components/Words'
import Categories from '../components/Categories'


const HomePage = () => {

  return(
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Messages />
      </Grid>
      <Grid item xs={4}>
        <Words />
      </Grid>
      <Categories />
    </Grid>
  )
}

export default HomePage