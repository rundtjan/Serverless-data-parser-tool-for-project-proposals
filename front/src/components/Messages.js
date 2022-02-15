import React from 'react'

import { useSelector } from 'react-redux'
import '@fontsource/roboto/300.css'

import { Grid, Typography, List } from '@mui/material'
import Message from './Message'


const Messages = () => {
  const messages = useSelector(state => state.data.messages)


  if(!messages) {
    return(
      <Grid container>
        <Grid item>
          <Typography
            variant="body1"
            component="div"
            color="textSecondary"
          >
          Loading messages...
          </Typography>
        </Grid>
      </Grid>
    )
  }

  return(
    <Grid item id='messageList'>
      <Typography variant="h4">Slack messages</Typography>
      <List>
        {messages.map(message => (
          <Message key={message.client_msg_id} message={message}/>
        ))}
      </List>
    </Grid>
  )

}

export default Messages
