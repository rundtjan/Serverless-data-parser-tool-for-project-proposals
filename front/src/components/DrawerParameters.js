import React from 'react'

//Mui components
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const DrawerParameters = () => {

  return(
    <Box
      bgcolor='#f9f9f9'
      sx={{
        p: 2
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            noWrap
            component='div'
          >
                Current parameters
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
                Channel: todo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
                User: todo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
                Hours: todo
          </Typography>
        </Grid>
      </Grid>

    </Box>
  )
}

export default DrawerParameters