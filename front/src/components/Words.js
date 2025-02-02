import React, { useState } from 'react'
import { useSelector } from 'react-redux'

//Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

//Components
import Word from './Word'


const Words = () => {
  const words = useSelector(state => state.data.words)
  const [ category, setCategory ] = useState('Show all')
  const filterCategories = ['Company', 'Date', 'Number', 'Technology', 'Show all']
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
        <List sx={{ py: 0, my:0 }}>
          {words.map(word => (
            <Word key={Math.random().toString(36).slice(2)} word={word}/>
          ))}
        </List>
      )
    } else if(category === 'Company') {
      return(
        <List sx={{ py: 0, my:0 }}>
          {words.filter(word => word.category === 'Customer').map(word => (
            <Word key={Math.random().toString(36).slice(2)} word={word}/>
          ))}
        </List>
      )
    } else if(category === 'Number') {
      return(
        <List sx={{ py: 0, my:0 }}>
          {words.filter(word => word.category === 'Price').map(word => (
            <Word key={Math.random().toString(36).slice(2)} word={word}/>
          ))}
        </List>
      )
    } else if(category === 'Date') {
      return(
        <List sx={{ py: 0, my:0 }}>
          {words.filter(word => word.category === 'Deadline').map(word => (
            <Word key={Math.random().toString(36).slice(2)} word={word}/>
          ))}
        </List>
      )
    } else return(
      <List sx={{ py: 0, my:0 }}>
        {words.filter(word => word.category === category).map(word => (
          <Word key={Math.random().toString(36).slice(2)} word={word}/>
        ))}
      </List>
    )
  }


  if(!words) {
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
        <Box>
          <Typography variant='h5' textAlign='center'>
          Loading...
          </Typography>
        </Box>
      </Box>
    )
  }


  return(
    <Box
      id='wordList'
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
        {getWordsList()}
      </Box>
    </Box>
  )
}

export default Words