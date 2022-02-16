import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container, Menu, MenuItem, Button } from '@mui/material'
import List from '@mui/material/List'
import Word from './Word'

const Words = () => {
  const words = useSelector(state => state.data.words)
  const [ category, setCategory ] = useState(null)
  const filterCategories = ['Technology', 'Number', 'Date', 'Show all']
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClose = (event, category) => {
    setCategory(category)
    setAnchorEl(null)
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const wordsList = () => {
    if(category === 'Show all') {
      return (
        <List dense >
          {words.map(obj => (
            <Word key={obj.word} obj={obj}/>
          ))}
        </List>
      )
    }
    if(category) {
      return (
        <List dense >
          {words.filter(w => w.category === category).map(obj => (
            <Word key={obj.word} obj={obj}/>
          ))}
        </List>
      )
    } else {
      return (
        <List dense >
          {words.map(obj => (
            <Word key={obj.word} obj={obj}/>
          ))}
        </List>
      )
    }
  }

  if(!words) {
    return(
      <Typography
        variant="body1"
        color="textSecondary">
        Loading words...
      </Typography>
    )
  }

  return (
    <Container id='wordList'>
      <Typography variant='h5'>
        Words from messages
      </Typography>
      <Button
        id='filter-button'
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}

      >
        Filter words
      </Button>
      <Menu
        id='filter-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        {filterCategories.map(category => (<MenuItem selected={category === category} key={category} id={category} onClick={(event) => handleClose(event, category)}>{category}</MenuItem>))}
      </Menu>
      { wordsList() }
    </Container>
  )
}

export default Words
