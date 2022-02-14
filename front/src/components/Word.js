import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addHighlightedWord, clearHighlightedWords } from '../reducers/highlightReducer'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

const Word = ({ obj }) => {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()

  /**
   * Handles checkbox action. Adds word to highlight list when toggled on and removes word from list when toggled off.
   */
  const handleToggle = () => {
    if(checked) {
      setChecked(false)
      dispatch(clearHighlightedWords(obj.word))
    } else {
      setChecked(true)
      dispatch(addHighlightedWord(obj.word))
    }
  }

  const handleAddHighlight = () => {
    if(!checked) {
      dispatch(addHighlightedWord(obj.word))
    }
  }

  const handleClearHighlight = () => {
    if(!checked) {
      dispatch(clearHighlightedWords(obj.word))
    }
  }

  return(
    <ListItem
      key={obj.word}
      disableGutters
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle}
          checked={checked}
        />
      }
    >
      <ListItemText
        onMouseOver={() => handleAddHighlight()}
        onMouseOut={() => handleClearHighlight()}
      >
        {obj.word}: {obj.count}
      </ListItemText>

    </ListItem>
  )
}

export default Word