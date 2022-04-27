import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Components
import CategoryItem from './CategoryItem'

//Reducers
import { setAssignedWord } from '../../reducers/assignReducer'

//Mui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'

/**
 * Component for category.
 * @param {*} category
 * @returns Grid-item containing box for category
 */
const Category = ({ category }) => {
  const assignedWords = useSelector(state => state.assignedWords.filter(word => word.category === category))
  const dispatch = useDispatch()

  const handleAddNewTextField = () => {
    console.log('pingpong')
    console.log(category)
    dispatch(setAssignedWord('', category))
  }

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
        <Grid
          container
          alignItems='center'
        >
          <Grid item xs={8}>
            <Typography
              variant='h6'
              textAlign='center'
            >
              {category}
            </Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <IconButton onClick={handleAddNewTextField}>
              <AddBoxIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            overflow: 'scroll', minHeight: 170
          }}
        >
          <List dense>
            {assignedWords.map(word => (
              <CategoryItem key={Math.random().toString(36).slice(2)} word={word.word}/>
            ))}
          </List>
        </Box>
      </Box>
    </Grid>
  )
}

export default Category