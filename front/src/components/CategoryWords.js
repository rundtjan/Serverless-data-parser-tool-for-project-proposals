import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
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
          <ListItem key={word.word +'-assignItem'}>
            <ListItemText key={word.word + '-assignText'}>
              {word.word}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default CategoryWords