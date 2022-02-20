import React from 'react'
import { useSelector } from 'react-redux'

//Mui components
import Box from '@mui/material/Box'
//import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'


//Tomi Testikama
import TestMessage from './TestMessage'

const TestMessages = () => {
  const messages = useSelector(state => state.data.messages)

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
    <Box
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
        {/*Slack Messages*/}
        <List dense>
          {messages.map(message => (
            <TestMessage key={message.client_msg_id} message={message}/>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default TestMessages