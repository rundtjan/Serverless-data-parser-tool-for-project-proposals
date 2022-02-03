
const reducer = (state='', action) => {
  switch(action.type) {
  case 'SET_HIGHLIGHTED_WORD':
    return action.word
  case 'CLEAR_HIGHLIGHTED_WORD':
    return ''
  default:
    return state
  }
}

export const setHighlightedWord = (word) => {
  return async dispatch => {
    dispatch({
      type: 'SET_HIGHLIGHTED_WORD',
      word
    })
  }
}

export const clearHighlightedWord = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_HIGHLIGHTED_WORD'
    })
  }
}

export default reducer