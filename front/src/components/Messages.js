import { Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

const Messages = () => {

    const messages = useSelector(state => state.data.messages)

    if(!messages) {
        return(
            <p>
                Loading messages...
            </p>
        )
    }

    
    return(
        <div>
        <Typography variant='h3'>
            Messages from slack channel
        </Typography>
            {messages.map(message => 
                <p key={message.client_msg_id}>
                    '<b>{message.text}</b>' was sent by user {message.real_name} ({message.user})
                </p>
            )}
        </div>
    )
    
}

export default Messages;
