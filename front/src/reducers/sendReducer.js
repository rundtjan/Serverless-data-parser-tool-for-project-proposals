import sendJSONService from  '../services/sendJSON'

const reducer = (state = '', action) => {
  switch(action.type) {
  case 'SEND_SUCCESS':
    return 'success'
  case 'SEND_PENDING':
    return 'pending'
  case 'SEND_ERROR':
    return 'error'
  case 'SEND_RESET':
    return ''
  default:
    return state
  }
}

export const sendPending = () => {
  return {
    type: 'SEND_PENDING'
  }
}

export const sendAssignedJSON = () => {
  return async (dispatch, getState) => {
    const assignedWords = getState().assignedWords
    const data = await sendJSONService.sendJSON(assignedWords)
    console.log(data)
    if (data === 'success') {
      dispatch(clearAssignedWords())
      dispatch({
        type: 'SEND_SUCCESS'
      })
    } else {
      dispatch({
        type: 'SEND_ERROR'
      })
    }
  }
}

export const clearAssignedWords = () => {
  return {
    type: 'CLEAR_ASSIGNED'
  }
}


export default reducer

