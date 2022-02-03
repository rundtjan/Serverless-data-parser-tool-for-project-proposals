import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Grid } from '@mui/material'
import List from '@mui/material/List'

import Word from './Word'

const Words = () => {
  const words = useSelector(state => state.data.words)

  if(!words) {
    return(
      <Typography
        variant="body1"
        color="textSecondary">
        Loading words...
      </Typography>
    )
  }

  return (
    <Grid>
      <Typography variant='h5'>
        Words from messages
      </Typography>
      <List dense >
        {words.map(obj => (
          <Word key={obj.word} obj={obj}/>
        ))}
      </List>
    </Grid>
  )
}

export default Words