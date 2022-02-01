import messageService from '../services/messages'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_MESSAGES':
    return action.data
    /* case 'SET_PARAMETERS':
    return state
  case 'INIT_CHANNELS':
    return action.data.channels */
  default:
    return state
  }
}

export const initializeMessages = () => {
  return async dispatch => {
    const data = await messageService.getAll()
    dispatch({
      type: 'INIT_MESSAGES',
      data
    })
  }
}
/*export const initializeChannels = () => {
  return async dispatch => {
    const channels = await channelService.getChannels()
    dispatch({
      type: 'INIT_CHANNELS',
      channels
    })
  }
} */
/*
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
} */

export default reducer

