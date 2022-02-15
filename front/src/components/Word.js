import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addHighlightedWord, clearHighlightedWords } from '../reducers/highlightReducer'
import { setAssignedWord, unAssignWord } from '../reducers/assignReducer'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Word = ({ obj }) => {
  const [checked, setChecked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const categories = useSelector(state => state.data.categories)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()


  const handleToggle = (event) => {
    if(checked) {
      dispatch(clearHighlightedWords(obj.word))
      dispatch(unAssignWord(obj.word))
    } else {
      dispatch(addHighlightedWord(obj.word))
      setShowMenu(true)
      setAnchorEl(event.currentTarget)
    }
    setChecked(!checked)
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

  const handleClose = (event) => {
    if (!event.currentTarget.id) setChecked(false)
    else dispatch(setAssignedWord(obj.word, event.currentTarget.id))
    setAnchorEl(null)
    setShowMenu(false)
  }

  if (!showMenu){
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {categories.map(category => (<MenuItem key={category} id={category} onClick={handleClose}>{category}</MenuItem>))}
      </Menu>
    </ListItem>
  )


}

export default Word