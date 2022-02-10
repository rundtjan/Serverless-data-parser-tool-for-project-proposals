import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
//import Paper from '@mui/material/Paper'

//import Word from './Word'

const CategoryWords = ({ category }) => {
  const assignedWords = useSelector(state => state.assignedWords.filter(word => word.category === category))

  return (
    <Container>
      <Box
        sx={{
          boxShadow: 2,
          borderRadius: 1,
          minHeight: 200,
          minWidth: 150,
          m: -1,
        }}>
        <Typography variant='h5' textAlign='center'>
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
      </Box>
    </Container>
  )
}

export default CategoryWords