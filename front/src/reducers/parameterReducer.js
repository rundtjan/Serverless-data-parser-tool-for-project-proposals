import paramsService from '../services/params'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_PARAMETERS':
    return action.data
  default:
    return state
  }
}

/**
 * Initializes parameters to the sidedrawer
 * Used in App.js
 * @see paramService
 */
export const initializeParameters = () => {
  return async dispatch => {
    const data = await paramsService.getParams()
    dispatch({
      type: 'SET_PARAMETERS',
      data: {
        channel: data.paramChannel,
        user: data.paramUser,
        hours: data.paramHours,
      }
    })
  }
}

/**
 * Updates parameters in the sidedrawer
 * Used in ParametersForm.js
 * @param {String} channel
 * @param {String} user
 * @param {String} hours
 */
export const updateParameters = (channel, user, hours) => {
  return{
    type: 'SET_PARAMETERS',
    data: {
      channel: channel,
      user: user,
      hours: hours
    }
  }
}

export default reducer

