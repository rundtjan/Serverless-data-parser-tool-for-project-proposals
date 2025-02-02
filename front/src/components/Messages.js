import React from 'react'
import { useSelector } from 'react-redux'

//Mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'

//Components
import Message from './Message'

/**
 * Displays the messages from the slack.
 * - Uses box layout
 * @returns Box containing messages
 */
const Messages = () => {
  const messages = useSelector(state => state.data.messages)
  const words = useSelector(state => state.data.words)

  if(!messages) {
    return(
      <Box
        sx={{
          backgroundColor: '#fafafa',
          height: 600,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant='h6' textAlign='center' justifyContent='center'>
          Slack Messages
        </Typography>
        <Divider />
        <Box>
          <Typography variant='h5' textAlign='center'>
            Loading...
          </Typography>
        </Box>
      </Box>
    )
  }


  return(
    <Box id='messageList'
      sx={{
        backgroundColor: '#fafafa',
        height: 600,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant='h6' textAlign='center'>
        Slack Messages
      </Typography>
      <Divider />
      <Box sx={{ overflow: 'scroll', minHeigth: 0 }}>
        <List sx={{ py: 0, my:0 }}>
          {messages.map(message => (
            <Message key={message.client_msg_id} message={message} words={words}/>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Messages