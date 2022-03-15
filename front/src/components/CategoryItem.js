import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { unAssignWord, editAssignedWord } from '../reducers/assignReducer'

//Mui components
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'


/**
 * Component that displays word in the category list.
 * - Used in Category.js
 * @param {String} word
 * @returns ListItem containing textfield and delete button
 */
const CategoryItem = ({ word }) => {
  const [value, setValue] = useState(word)
  const dispatch = useDispatch()


  /**
   * Removes the word from the category.
   * @see unAssignWord
   * @param {*} word
   */
  const handleRemoveFromCategory = (word) => {
    dispatch(unAssignWord(word))
  }

  /**
   * Handles the word editing event
   * @see editAssignedWord
   * @param {*} event
   */
  const handleEdit = (event) => {
    event.preventDefault()
    const editedWord = event.target.value

    dispatch(editAssignedWord(value, editedWord))
    setValue(event.target.value)
  }

  return(
    <ListItem
      key={word + '-assignItem'}
      divider
      secondaryAction={
        <IconButton edge='end' onClick={() => handleRemoveFromCategory(word.word)}>
          <DeleteIcon/>
        </IconButton>
      }
    >
      <TextField
        key={`${word}-assignText`}
        size='small'
        onChange={handleEdit}
        value={value}
        autoFocus={true}
        variant='standard'
      />
    </ListItem>
  )
}

export default CategoryItem