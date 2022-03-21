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
import { IconButton } from '@mui/material'


//Reducers
import { addHighlightedWord, clearHighlightedWord } from '../reducers/highlightReducer'
import { setAssignedWord, unAssignWord } from '../reducers/assignReducer'
import { readyToSend } from '../reducers/readyToSendReducer'


const Word = ({ word }) => {
  const [checked, setChecked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)


  const categories = useSelector(state => state.data.categories)
  const sendStatus = useSelector(state => state.sendStatus)

  const dispatch = useDispatch()


  const handleToggle = () => {
    if(checked) {
      dispatch(clearHighlightedWord(word.word))
      dispatch(unAssignWord(word.word))
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
      dispatch(clearHighlightedWord(word.word))
    }
  }

  const unCheck = () => {
    if (checked) {
      setChecked(!checked)
      dispatch(clearHighlightedWord(word.word))
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (event) => {
    if(event.currentTarget.id) {
      dispatch(setAssignedWord(word.word, event.currentTarget.id))
      dispatch(readyToSend())
      if(!checked) handleToggle()
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
        sx={{ py: 0, my:0 }}
      >
        <ListItemIcon>
          {sendStatus === 'success' && unCheck()}
          <Checkbox
            edge='start'
            checked={checked}
            sx={{ py: 0, my:0 }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ py: 0, my:0 }}
        >
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

export default Word