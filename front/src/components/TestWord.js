/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//Mui components
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'


//Reducers
import { addHighlightedWord, clearHighlightedWords } from '../reducers/highlightReducer'
import { setAssignedWord, unAssignWord } from '../reducers/assignReducer'
import { IconButton } from '@mui/material'


const TestWord = ({ word }) => {
  const [checked, setChecked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)


  const categories = useSelector(state => state.data.categories)
  const dispatch = useDispatch()


  const handleToggle = () => {
    if(checked) {
      dispatch(clearHighlightedWords(word.word))
    } else {
      dispatch(addHighlightedWord(word.word))
    }
    setChecked(!checked)
  }

  const handleAddHighlight = () => {
    if(!checked) {
      dispatch(addHighlightedWord(word.word))
    }
  }

  const handleClearHighlight = () => {
    if(!checked) {
      dispatch(clearHighlightedWords(word.word))
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (event) => {
    if(event.currentTarget.id) {
      dispatch(setAssignedWord(word.word, event.currentTarget.id))
    }
    setAnchorEl(null)
  }


  return(
    <ListItem
      key={word.word}
      disablePadding
      secondaryAction={
        <IconButton edge='end' aria-label='category' onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
      }
    >
      <ListItemButton
        divider
        onClick={handleToggle}
        onMouseOver={() => handleAddHighlight()}
        onMouseOut={() => handleClearHighlight()}
      >
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={checked}
          />
        </ListItemIcon>
        <ListItemText>
          {word.word}: {word.count}
        </ListItemText>
      </ListItemButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {categories.map(category => (
          <MenuItem key={category} id={category} onClick={handleMenuClose}>
            {category}
          </MenuItem>
        ))}
      </Menu>
    </ListItem>
  )
}

export default TestWord