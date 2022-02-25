import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Reducers
import { sendPending, sendAssignedJSON } from '../reducers/sendReducer'


//Mui stuff
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { yellow } from '@mui/material/colors'

const SendToHubspot = () => {
  const dispatch = useDispatch()
  const sendStatus = useSelector(state => state.sendStatus)

  const sendJson = async(event) => {
    event.preventDefault()
    dispatch(sendPending())
    //dispatch(clearAssignedWords())
    dispatch(sendAssignedJSON())
  }

  //https://mui.com/components/progress/

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
            <Box sx={{ display: 'flex', alignItems: 'left' }}>
              <Box sx={{ position: 'relative' }}>
                <Button
                  variant='outlined'
                  id='submit'
                  onClick={sendJson}
                  disabled={sendStatus === 'pending' || sendStatus === 'error'} //this is just to test that it works
                >
                Send To Hubspot
                </Button>
                {(sendStatus === 'pending' || sendStatus === 'error') && (//'error' here just to test that it works
                  <CircularProgress
                    size={24}
                    sx={{
                      color: yellow[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SendToHubspot