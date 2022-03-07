const reducer = (state = false, action) => {
  switch(action.type) {
  case 'SEND_SUCCESS':
    return false
  case 'SEND_PENDING':
    return false
  case 'SEND_ERROR':
    return true
  case 'READY_TO_SEND':
    return true
  case 'CLEAR_ASSIGNED':
    return false
  default:
    return state
  }
}

export const readyToSend = () => {
  return {
    type: 'READY_TO_SEND'
  }
}

export default reducer