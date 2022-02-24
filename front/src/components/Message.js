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

//Helper
import { escapeRegExp } from '../utils/helper'


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
   * Parses timestamp to easier string to read
   * @param {*} ts
   * @returns Time in stringformat: [hours:minutes(day.month)]
   */
  const parseTime = (ts) => {
    const a = new Date(ts * 1000)
    const hours = ('0' + a.getHours()).slice(-2)
    const minutes = ('0' + a.getMinutes()).slice(-2)
    const date = ('0' + a.getDate()).slice(-2)
    const month = ('0' + (a.getMonth() + 1)).slice(-2)

    return(
      hours + ':' + minutes + '(' + date + '.' + month + ')'
    )
  }

  const checkWord = (word) => {
    const specials = ['!', '"', '#', '$', '%', '&', '\'', '()', '*', '+', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', 'ä', 'ö', 'å', '€' ]
    if (specials.includes(word.charAt(word.length-1))) {
      return `\\b${escapeRegExp(word)}\\B`
    }
    return `\\b${word}\\b`
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
          {obj.text} [{obj.real_name}][{parseTime(obj.ts)}]
        </Typography>
      )
    }

    //`\\b${highlightword}\\b`
    //\\b${highlightword}\\b hyväksyy ääkkösillä alkavat, .NET, €100
    //\\b${highlightword}\\B hyväksyy esim 10.000€, F#, C# ja ääkkösiin loppuvat
    const pattern = highlightWords.map(highlightword => checkWord(highlightword)).join('|')
    console.log(pattern)
    const words = obj.text.split(new RegExp(`(${pattern})`, 'gi'))

    return(
      <Typography component='span'>
        {words.map((word, index) => (highlightWords.map(highlight => highlight.toLowerCase()).includes(word.toLowerCase())) ? <Typography key={index} component='span'><Box sx={{ backgroundColor: '#ffeb3b' }}component='span'>{word}</Box></Typography> : word)} [{obj.real_name}][{parseTime(obj.ts)}]
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