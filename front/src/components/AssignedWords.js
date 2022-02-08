import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container } from '@mui/material'
import List from '@mui/material/List'

//import Word from './Word'

const AssignedWords = () => {
  const assignedWords = useSelector(state => state.assignedWords)

  return (
    <Container>
      <Typography variant='h5'>
        Assigned words
      </Typography>
      <List dense >
        {assignedWords.map(word => (
          <p key={word.word}>{word.word} {word.category}</p>
        ))}
      </List>
    </Container>
  )
}

export default AssignedWords