const reducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_ASSIGNED':
    return state.filter(word => word.word !== action.data.word).concat(action.data)
  case 'DEL_ASSIGNED':
    return state.filter(word => word.word !== action.data.word)
  case 'CLEAR_ASSIGNED':
    return []
  default:
    return state
  }
}

export const setAssignedWord = (word='', category='') => {
  const data = { word, category }
  return {
    type: 'ADD_ASSIGNED',
    data
  }
}

export const unAssignWord = (word='', category='') => {
  return (dispatch, getState) => {
    console.log(getState().assignedWords.length)
    const data = { word, category }
    if (getState().assignedWords.length === 1){
      dispatch({
        type: 'CLEAR_ASSIGNED',
        data
      })
    } else {
      dispatch({
        type: 'DEL_ASSIGNED',
        data
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

