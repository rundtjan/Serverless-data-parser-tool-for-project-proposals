import React from 'react'
//import { useSelector } from 'react-redux'

//Mui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
//import List from '@mui/material/List'



const TestCategory = ({ category }) => {
  //const assignedWords = useSelector(state => state.assignedWords.filter(word => word.category === category))

  return(
    <Grid item>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          height: 200,
          width: 200
        }}
      >
        <Typography>
          { category }
        </Typography>
      </Box>
    </Grid>
  )
}

export default TestCategory