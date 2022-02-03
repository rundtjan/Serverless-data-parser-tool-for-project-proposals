import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setHighlightedWord, clearHighlightedWord } from '../reducers/highlightReducer'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

const Word = ({ obj }) => {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()

  const handleToggle = () => {
    setChecked(!checked)
  }

  const handleAddHighlight = () => {
    dispatch(setHighlightedWord(obj.word))
  }

  const handleClearHighlight = () => {
    dispatch(clearHighlightedWord())
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