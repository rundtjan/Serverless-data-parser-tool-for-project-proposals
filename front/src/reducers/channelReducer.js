import channelService from '../services/channels'

const reducer = (state='general', action) => {
  console.log(action.data)
  switch(action.type) {
  case 'SET_CHANNEL':
    return action.channel
  case 'SET_PARAMETERS':
    return state
  case 'INIT_CHANNELS':
    return action.data
  default:
    return state
  }
}

export const setChannel = (channel) => {
  return async dispatch => {
    dispatch({
      type: 'SET_CHANNEL',
      channel
    })
  }
}
export const setParameters = (channel='', user='', hours='') => {
  return async dispatch => {
    await channelService.sendParameters(channel, user, hours)
    dispatch({
      type: 'SET_PARAMETERS',
      data: {
        channel: channel,
        user: user,
        hours: hours
      }
    })
  }
}

export const initializeChannels = () => {
  return async dispatch => {
    const data = await channelService.getChannels()
    console.log('data from init', data)
    dispatch({
      type: 'INIT_CHANNELS',
      data
    })
  }
}

export default reducer