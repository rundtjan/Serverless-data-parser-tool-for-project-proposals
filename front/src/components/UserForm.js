import { Typography, Grid, FormControl, InputLabel, MenuItem, Select, OutlinedInput, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch/*, useSelector */ } from 'react-redux'
import { setParameters } from '../reducers/channelReducer'
import { getMessagesParameters } from '../reducers/dataReducer'


const UserForm = () => {
  const [channel, setChannel] = useState('')
  const [user, setUser] = useState('')
  const [hours, setHours] = useState('')
  const dispatch = useDispatch()
  const possibleChannels = ['general', 'channel-two'] //useSelector(state => state.channel) //useSelector(state => state.channels)

  const putParameters = async (event) => {
    event.preventDefault()
    dispatch(setParameters(channel, user, hours))
    dispatch(getMessagesParameters(channel, user, hours))
    console.log(channel)
    setChannel('')
    setUser('')
    setHours('')
  }

  return (
    <Grid item>
      <div>
        <Typography
          variant='h5'>
            Make choices
        </Typography>
        <form onSubmit={putParameters}>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id='channel'>Channel</InputLabel>
            <Select
              id='channel'
              label='Channel'
              onChange={({ target }) => setChannel(target.value)}
              input={<OutlinedInput label='Channel' /> }
            >
              {possibleChannels.map((channel) => (
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
          <button id='submit'>choose</button>
        </form>
      </div>
    </Grid>

  )
}
export default UserForm