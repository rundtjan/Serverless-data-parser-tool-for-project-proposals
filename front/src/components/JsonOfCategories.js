import React from 'react'
import { useSelector /*useDispatch*/  } from 'react-redux'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// import { initializeJson } from '../reducers/jsonReducer'

const JsonOfCategories = () => {
  const json = useSelector(state => state.json)
  console.log('json: ' + JSON.stringify(json))

  return (
    <Box sx={{ p:2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' textAlign='left' component='div'>
              JSON to Hubspot
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography key={json}>
            { JSON.stringify(json) }
          </Typography>
        </Grid>

      </Grid>
    </Box>
  )

}
export default JsonOfCategories