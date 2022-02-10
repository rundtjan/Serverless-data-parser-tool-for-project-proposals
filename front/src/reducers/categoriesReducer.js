const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_CATEGORIES':
    return action.data
  default:
    return state
  }
}

export const initializeCategories = () => {
  const data = ['Customer', 'Price', 'Deadline', 'Fte', 'Contact', 'Technology']
  return {
    type: 'INIT_CATEGORIES',
    data
  }
}

export default reducer