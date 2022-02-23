import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'

//Reducers
//import { clearAssignedWords } from '../reducers/assignReducer'


//Mui stuff
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const SendToHubspot = () => {
  //const dispatch = useDispatch()

  const sendJson = async(event) => {
    event.preventDefault()
    //dispatch(clearAssignedWords())
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