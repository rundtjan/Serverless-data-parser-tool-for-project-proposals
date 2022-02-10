import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container } from '@mui/material'
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
    <Container id='wordList'>
      <Typography variant='h5'>
        Words from messages
      </Typography>
      <List dense >
        {words.map(obj => (
          <Word key={obj.word} obj={obj}/>
        ))}
      </List>
    </Container>
  )
}

export default Words