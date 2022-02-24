import React from 'react'
import { useDispatch } from 'react-redux'

//Reducers
import { sendPending, sendAssignedJSON } from '../reducers/sendReducer'


//Mui stuff
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const SendToHubspot = () => {
  const dispatch = useDispatch()

  const sendJson = async(event) => {

    event.preventDefault()
    dispatch(sendPending())
    //dispatch(clearAssignedWords())
    dispatch(sendAssignedJSON())
  }



  return(
    <Box
      bgcolor='#f9f9f9'
      sx={{
        p: 2
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item>
            <Button
              variant='outlined'
              id='submit'
              onClick={sendJson}
            >
              Send To Hubspot
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SendToHubspot