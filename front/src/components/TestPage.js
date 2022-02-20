import React from 'react'

//Mui components
import Grid from '@mui/material/Grid'

//Components
import TestMessages from '../components/TestMessages'
import TestWords from '../components/TestWords'
import TestCategories from './TestCategories'


/**
 * Default page for the parsa-app
 * @returns Homepage content
 */
const TestPage = () => {

  return(
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <TestMessages />
      </Grid>
      <Grid item xs={4}>
        <TestWords />
      </Grid>
      <TestCategories />
    </Grid>
  )
}

export default TestPage