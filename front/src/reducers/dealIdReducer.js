const reducer = (state = '', action) => {
  switch(action.type) {
  case 'SET_ID':
    return action.id
  case 'CLEAR_ID':
    return state = ''
  default:
    return state
  }
}

/**
 * Stores id for Hubspot deal.
 * @param {Number} id Hubspot deal id
 *
 */
export const setDealId = (id) => {
  return {
    type:  'SET_ID',
    id
  }
}
export const clearId = () => {
  return {
    type: 'CLEAR_ID'
  }
}


export default reducer
