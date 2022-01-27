import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import '@fontsource/roboto/300.css'

const Messages = () => {
  const messages = useSelector(state => state.data.messages)

  if(!messages) {
    return(
      <Typography variant='body2'>
        Loading messages...
      </Typography>
    )
  }
  return(
    <div>
      <Typography variant='h4'>
        Messages from slack channel
      </Typography>

      {messages.map(message => (
        <ul key={message.client_msg_id}>
          <Typography variant='body1'>
            <b>`{message.text} </b> was sent by user {message.real_name} {message.user} `
          </Typography>
        </ul>
      ))}
    </div>
  )

}

export default Messages
