import React, { useState } from 'react'
import { useSelector } from 'react-redux'

//Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
//import ListItem from '@mui/material/ListItem'
//import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

//Tomin testikama
import TestWord from './TestWord'


const TestWords = () => {
  const words = useSelector(state => state.data.words)
  const [ category, setCategory ] = useState('Show all')
  const filterCategories = ['Technology', 'Number', 'Date', 'Show all']
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)


  const handleClose = (event, category) => {
    if(event.currentTarget.id) {
      setCategory(category)
    }
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }


  const getWordsList = () => {
    if(category === 'Show all') {
      return(
        <List dense>
          {words.map(word => (
            <TestWord key={word.word} word={word}/>
          ))}
        </List>
      )
    }

    return(
      <List dense>
        {words.filter(word => word.category === category).map(word => (
          <TestWord key={word.word} word={word}/>
        ))}
      </List>
    )
  }


  if(!words) {
    return(
      <div>
        loading
      </div>
    )
  }


  return(
    <Box
      sx={{
        backgroundColor: '#fafafa',
        height: 600,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant='h6' textAlign='center'>
        Words from messages
      </Typography>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: 1
        }}
      >
        <Typography>
            Filter: {category}
        </Typography>
        <Button
          id='filter-button'
          aria-controls={open ? 'filter-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant='contained'
          size='small'
        >
        Filter words
        </Button>
      </Box>
      <Menu
        id='filter-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        {filterCategories.map(category => (
          <MenuItem key={category} id={category} onClick={(event) => handleClose(event, category)}>
            {category}
          </MenuItem>))}
      </Menu>
      <Divider />
      <Box
        sx={{
          overflow: 'scroll', minHeigth: 0
        }}
      >
        <List dense>
          {getWordsList()}
        </List>
      </Box>
    </Box>
  )
}

export default TestWords