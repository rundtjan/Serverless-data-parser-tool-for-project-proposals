import React from 'react'
import { useSelector } from 'react-redux'

//Mui componennts
import Grid from '@mui/material/Grid'
//import Box from '@mui/material/Box'

//Tomin testikamaa
import TestCategory from './TestCategory'



const TestCategories = () => {
  const categories = useSelector(state => state.data.categories)

  if(!categories) {
    return(
      <div>
        loading
      </div>
    )
  }

  return(
    <Grid container item xs={12} id='categoryGrid' justifyContent='space-between' spacing={2}>
      {categories.map(category => <TestCategory key={category} category={category}/>)}
    </Grid>
  )
}

export default TestCategories