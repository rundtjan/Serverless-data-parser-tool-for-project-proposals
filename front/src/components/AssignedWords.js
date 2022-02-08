import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container } from '@mui/material'
import List from '@mui/material/List'

//import Word from './Word'

const AssignedWords = () => {
  const assignedWords = useSelector(state => state.assignedWords)

  /*if(!words) {
    return(
      <Typography
        variant="body1"
        color="textSecondary">
        Loading words...
      </Typography>
    )
  }*/

  return (
    <Container>
      <Typography variant='h5'>
        Assigned words
      </Typography>
      <List dense >
        {assignedWords.map(word => (
          <p key={word.word}>{word.word}</p>
        ))}
      </List>
    </Container>
  )
}

export default AssignedWords