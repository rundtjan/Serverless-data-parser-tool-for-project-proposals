import React from 'react'
import { useSelector } from 'react-redux'

//Mui componennts
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//Components
import Category from './Category'


/**
 * Layout for the categories
 * @returns Grid containing category boxes
 */
const Categories = () => {
  const categories = useSelector(state => state.data.categories)

  if(!categories) {
    return(
      <Box
        sx={{
          backgroundColor: '#fafafa',
          height: 200,
          width: '100%',
          display: 'flex',
          ml: 3,
          mt: 3,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h5' textAlign='center' justifyContent='center'>
          Loading...
        </Typography>
      </Box>
    )
  }

  return(
    <Grid container item xs={12} id='categoryGrid' justifyContent='space-between' spacing={2}>
      {categories.map(category => <Category key={category} category={category}/>)}
    </Grid>
  )
}

export default Categories