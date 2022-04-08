import sendJSONService from  '../services/sendToHubspot'
import { clearId } from './dealIdReducer'
import { setUserMessage } from './userMessageReducer'

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

/**
 * A function which produces an action to send a JSON containing categorized words to the api.
 * @param {*} sendJSONService The function which does the api-call. Can be replaced with a mock, that's why it's an injected dependency.
 * @returns A dispatch to switch the state of sendStatus - from pending to success or error.
 */
export const createSendAssignedJSON = (sendJSONService) => {
  return () => {
    return async (dispatch, getState) => {
      const assignedWords = getState().assignedWords
      const responseTarget = getState().responseTarget
      if (assignedWords.length === 0) {
        dispatch({
          type: 'SEND_ERROR'
        })
        return
      }
      const data = await sendJSONService(assignedWords, responseTarget)
      if (data.status && data.status === 'success') {
        dispatch(clearAssignedWords())
        if (data.message){
          dispatch(setUserMessage(data.message))
        }
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
}

export const sendAssignedJSON = createSendAssignedJSON(sendJSONService.sendJSON)


export const updateHubspotDeal = (id) => {
  console.log('sendReducer in updateHubspotDeal id ' + id)
  return async (dispatch, getState) => {
    const assignedWords = getState().assignedWords
    if (assignedWords.length === 0) {
      dispatch({
        type: 'SEND_ERROR'
      })
      return
    }
    console.log('sending data assignedwords length ' + assignedWords.length)
    const data = await sendJSONService.updateDeal(id, assignedWords)
    if (data.status && data.status === 'success') {
      dispatch(clearAssignedWords())
      dispatch(clearId())
      if (data.message){
        dispatch(setUserMessage(data.message))
      }
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

export const sendReset = () => {
  return {
    type: 'SEND_RESET'
  }
}


export default reducer