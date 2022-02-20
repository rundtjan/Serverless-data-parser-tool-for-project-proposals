import React, { useState } from 'react'
import { useSelector } from 'react-redux'

//Mui components
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'


const Message = ({ message }) => {
  const [expanded, setExpanded] = useState(false)
  const highlightWords = useSelector(state => state.highlightWord)

  const threads = message.thread_array

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  /**
   * If message has threads, returns correct expand-icon according to the state.
   * - Returns null, if message does not have threads
   * @returns ExpandIcon for message
   */
  const showExpandIcon = () => {
    if(threads.length === 0) {
      return null
    }

    if(expanded) {
      return(
        <ExpandLess />
      )
    } else {
      return(
        <ExpandMore />
      )
    }
  }

  /**
   * If message has threads, returns them in a list.
   * @returns Collapse containing threads list
   */
  const showThreads = () => {
    if(threads.length === 0) {
      return null
    }
    return(
      <Collapse in={expanded}>
        <List sx={{ py: 0, my: 0 }}>
          {threads.map(thread => (
            <ListItem
              key={thread.client_msg_id}
              divider
              sx={{
                pl:4,
                py: 0,
                my: 0,
                backgroundColor: '#eeeeee'
              }}
            >
              {parseText(thread)}
            </ListItem>
          ))}
        </List>
      </Collapse>
    )
  }

  /**
   * Adds highlighting functionality to the text.
   * - Uses RexExp to split the text.
   * @param {Object} obj - Object containing the text
   * @returns Typography containing higlights
   */
  const parseText = (obj) => {

    if(highlightWords.length === 0) {
      return(
        <Typography component='span'>
          {obj.text}
        </Typography>
      )
    }

    const pattern = highlightWords.map(highlightword => `\\b${highlightword}\\b`).join('|')
    const words = obj.text.split(new RegExp(`(${pattern})`, 'gi'))

    return(
      <Typography component='span'>
        {words.map((word, index) => (highlightWords.map(highlight => highlight.toLowerCase()).includes(word.toLowerCase())) ? <Typography key={index} component='span'><Box sx={{ backgroundColor: '#ffeb3b' }}component='span'>{word}</Box></Typography> : word)}
      </Typography>
    )
  }

  return(
    <Box>
      <ListItemButton onClick={handleExpandClick} divider sx={{ py:0, my:0 }}>
        <ListItemText primary={parseText(message)} sx={{ py:0, my:0 }}/>
        {showExpandIcon()}
      </ListItemButton>
      {showThreads()}
    </Box>
  )
}

export default Message