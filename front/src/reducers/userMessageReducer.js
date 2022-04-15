const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.userMessage
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
export const setUserMessage = (userMessage) => {
  return {
    type: 'SET_MESSAGE',
    userMessage,
  }
}
export const clearUserMessage = () => {
  return {
    type: 'CLEAR_MESSAGE',
  }
}

export default reducer
