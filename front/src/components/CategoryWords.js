import React from 'react'
import { useSelector } from 'react-redux'
//import { Grid } from '@mui/material'
import { Typography, Container } from '@mui/material'
import List from '@mui/material/List'

//import Word from './Word'

const CategoryWords = ({ category }) => {
  const assignedWords = useSelector(state => state.assignedWords.filter(word => word.category === category))

  return (
    <Container>
      <Typography variant='h5'>
        { category }
      </Typography>
      <List dense >
        {assignedWords.map(word => (
          <p key={word.word}>{word.word} </p>
        ))}
      </List>
    </Container>
  )
}

export default CategoryWords