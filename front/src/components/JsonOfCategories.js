import React from 'react'
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const JsonOfCategories = () => {
  const json = useSelector(state => state.json)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box sx={{ position: 'relative' }}>
          JSON of category fields { json }
          </Box>
        </Box>
      </Grid>
    </Grid>
  )

}
export default JsonOfCategories