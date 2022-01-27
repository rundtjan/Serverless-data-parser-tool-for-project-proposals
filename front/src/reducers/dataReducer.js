import messageService from '../services/messages'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_MESSAGES':
    return action.data
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


export default reducer

