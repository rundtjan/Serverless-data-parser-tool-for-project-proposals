import React from 'react'
import { useSelector } from 'react-redux'

//Mui stuff
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const TestForm = () => {
  const channels = useSelector(state => state.channel)

  return(
    <Box
      bgcolor='#f9f9f9'
      sx={{
        p: 2
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
          >
            <InputLabel>Channel</InputLabel>
            <Select
              id='channel'
              label='Channel'
              defaultValue='general'
              input={<OutlinedInput label='Channel'/>}
            >
              {channels.map((channel) => (
                <MenuItem
                  key={channel}
                  value={channel}
                >
                  {channel}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id='user'
              label='User'
              variant='outlined'
              sx={{
                mt:1
              }}
            />
            <TextField
              id='hours'
              label='Hours'
              variant='outlined'
              sx={{
                mt:1
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant='outlined' id='submit'>Go</Button>
        </Grid>

      </Grid>
    </Box>
  )
}

export default TestForm