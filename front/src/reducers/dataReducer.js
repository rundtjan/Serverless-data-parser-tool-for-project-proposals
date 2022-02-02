import messageService from '../services/messages'

const reducer = (state = [], action) => {
  console.log(action.data)
  switch(action.type) {
  case 'INIT_MESSAGES':
    return action.data
  default:
    return state
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

