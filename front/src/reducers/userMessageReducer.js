const reducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return ''
  default:
    return state
  }
}

/**
 * Initializes channels for the ParametersForm
 * Used in App.js
 * @see {@link channelService}
 */
export const setUserMessage = (msg) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      msg,
    })
  }
}
export const clearUserMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGE',
    })
  }
}

export default reducer
