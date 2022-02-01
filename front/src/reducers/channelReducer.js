import channelService from '../services/channels'

const reducer = (state='general', action) => {
  switch(action.type) {
  case 'SET_CHANNEL':
    return action.channel
  case 'SET_PARAMETERS':
    return state
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

export default reducer