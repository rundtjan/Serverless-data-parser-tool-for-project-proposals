import React from 'react'
import { useSelector } from 'react-redux'

//Components
import CategoryItem from './CategoryItem'

//Mui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'

/**
 * Component for category.
 * @param {*} category
 * @returns Grid-item containing box for category
 */
const Category = ({ category }) => {
  const assignedWords = useSelector(state => state.assignedWords.filter(word => word.category === category))

  return(
    <Grid item>
      <Box
        sx={{
          backgroundColor: '#fafafa',
          height: 200,
          width: 200,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant='h6' textAlign='center'>
          { category }
        </Typography>
        <Divider />
        <Box
          sx={{
            overflow: 'scroll', minHeight: 170
          }}
        >
          <List dense>
            {assignedWords.map(word => (
              <CategoryItem key={word.word} word={word.word}/>
            ))}
          </List>
        </Box>
      </Box>
    </Grid>
  )
}

export default Category