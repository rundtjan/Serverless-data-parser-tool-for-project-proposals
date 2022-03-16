import paramsService from '../services/params'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CHANGE_PARAMS':
    return action.data
  case 'INIT_PARAMETERS':
    return action.data
  default:
    return state
  }
}
export const initializeParameters = () => {
  return async dispatch => {
    const data = await paramsService.getParams()
    dispatch({
      type: 'INIT_PARAMETERS',
      data: {
        channel: data.paramChannel,
        user: data.paramUser,
        hours: data.paramHours,
      }
    })
  }
}
export const putParams = (channel, user, hours) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_PARAMS',
      data: {
        channel: channel,
        user: user,
        hours: hours
      }
    })
  }
}

export default reducer

