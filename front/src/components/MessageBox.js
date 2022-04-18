import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserMessage } from '../reducers/userMessageReducer'
//Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { IconButton, Link } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'


/**
 * Component for displaying result messages from a operation to the user.
 *
 * @returns Box, or null if no message is set in state.
 */
const MessageBox = () => {
  const message = useSelector(state => state.userMessage)
  const dispatch = useDispatch()

  const clearMessage = () => {
    dispatch(clearUserMessage())
  }

  if(!message) return null

  return (
    <Box sx={{ width: '100%', bgcolor: '#fafafa' }}>
      <Typography variant='h5' textAlign='center' color='black'>
        {message.text}
      </Typography>
      <Typography variant='h6' textAlign='center' color='black'>
        <Link href={message.link}>{message.link}</Link> <IconButton onClick={clearMessage}><CloseIcon color='error' /></IconButton>
      </Typography>
    </Box>
  )
}

export default MessageBox