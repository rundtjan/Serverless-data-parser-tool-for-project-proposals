import { Typography, Grid, FormControl, InputLabel,
  MenuItem, Select, OutlinedInput, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesParameters } from '../reducers/dataReducer'



const UserForm = () => {
  const [channel, setChannel] = useState('')
  const [user, setUser] = useState('')
  const [hours, setHours] = useState('')
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channel)

  const putParameters = async (event) => {
    event.preventDefault()
    dispatch(getMessagesParameters(channel, user, hours))
    setChannel('')
    setUser('')
    setHours('')
  }

  return (
    <Grid item>
      <Typography
        variant='h5'>
            Make choices
      </Typography>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id='channel'>Channel</InputLabel>
        <Select
          id='channel'
          label='Channel'
          defaultValue={''}
          onChange={({ target }) => setChannel(target.value)}
          input={<OutlinedInput label='Channel' /> }
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
        <TextField id='user' label='User' variant='outlined'
          onChange={({ target }) => setUser(target.value)}/>
        <TextField id='hours' label='Hours' variant='outlined'
          onChange={({ target }) => setHours(target.value)} />
      </FormControl>
      <Button onClick={putParameters} type='submit' id='submit'>Go</Button>
    </Grid>

  )
}
export default UserForm
