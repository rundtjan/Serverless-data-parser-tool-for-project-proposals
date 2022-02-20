import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Reducers
import { unAssignWord } from '../reducers/assignReducer'

//Mui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'


/**
 * Component for category.
 * @param {*} category
 * @returns Grid-item containing box for category
 */
const TestCategory = ({ category }) => {
  const assignedWords = useSelector(state => state.assignedWords.filter(word => word.category === category))
  const dispatch = useDispatch()

  /**
   * Removes the word from the category.
   * @see unAssignWord
   * @param {*} word
   */
  const handleRemoveFromCategory = (word) => {
    dispatch(unAssignWord(word))
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
        <Typography variant='h6' textAlign='center'>
          { category }
        </Typography>
        <Divider />
        <Box
          sx={{
            overflow: 'scroll', minHeigth: 0
          }}
        >
          <List dense>
            {assignedWords.map(word => (
              <ListItem
                key={word.word + '-assignItem'}
                divider
                secondaryAction={
                  <IconButton edge='end'>
                    <DeleteIcon
                      onClick={() => handleRemoveFromCategory(word.word)}
                    />
                  </IconButton>
                }
              >
                <ListItemText key={word.word + '-assignText'}>
                  {word.word}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Grid>
  )
}

export default TestCategory