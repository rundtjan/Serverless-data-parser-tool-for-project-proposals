import messageService from '../services/messages'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_MESSAGES':
    return action.data
  case 'UPDATE_MESSAGES':
    return action.data
  case 'ADD_CHECKED':{
    return state.data.checked[action.data.word] = true
  }
  default:
    return state
  }
}

export const getMessagesParameters = (channel='', user='', hours='') => {
  return async dispatch => {
    const data = await messageService.getWithParameters(channel, user, hours)
    dispatch({
      type: 'UPDATE_MESSAGES',
      data
    })
  }
}

export const initializeMessages = (channel='general') => {
  return async dispatch => {
    const data = await messageService.getAll(channel)
    dispatch({
      type: 'INIT_MESSAGES',
      data
    })
  }
}


export default reducer

