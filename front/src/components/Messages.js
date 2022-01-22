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
            <h2> Messages from slack channel</h2>
            {messages.map(message => 
                <p key={message.client_msg_id}>
                    '<b>{message.text}</b>' was sent by user {message.user}
                </p>
            )}
        </div>
    )
    
}

export default Messages;
