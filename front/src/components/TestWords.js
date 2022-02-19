import React from 'react'
import { useSelector } from 'react-redux'

//Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
//import List from '@mui/material/List'
//import ListItem from '@mui/material/ListItem'
//import ListItemText from '@mui/material/ListItemText'

const TestWords = () => {
  const words = useSelector(state => state.data.words)

  if(!words) {
    return(
      <div>
        loading
      </div>
    )
  }


  return(
    <Box
      sx={{
        backgroundColor: '#fafafa',
        height: 600,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography>
        Words from messages
      </Typography>
      <Divider />
    </Box>
  )
}

export default TestWords