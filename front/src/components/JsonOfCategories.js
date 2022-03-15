import React from 'react'
import { useSelector /*useDispatch*/  } from 'react-redux'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
// import { initializeJson } from '../reducers/jsonReducer'

const JsonOfCategories = () => {
  const json = useSelector(state => state.json)
  console.log('json: ' + JSON.stringify(json))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box sx={{ position: 'relative' }}>
          JSON of category fields { JSON.stringify(json) }
          </Box>
        </Box>
      </Grid>
    </Grid>
  )

}
export default JsonOfCategories