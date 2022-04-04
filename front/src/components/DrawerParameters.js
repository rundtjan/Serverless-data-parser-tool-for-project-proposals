import React from 'react'
import { useSelector } from 'react-redux'

//Mui components
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Component that shows which parameters are in use.
 * @returns Grid that shows which parameters are chosen.
 */
const DrawerParameters = () => {
  const data = useSelector(state => state.data)
  /** If there are no parameters. A grid with only names is returned. */
  if (!data.query){
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
                  Channel: ...
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
                  User: ...
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
                  Hours: ...
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  /** If there is parameters they are shown. */
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
                Channel: { data.query.channel }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
                User: { data.query.user }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
                Hours: { data.query.hours }
          </Typography>
        </Grid>
      </Grid>

    </Box>
  )
}

export default DrawerParameters