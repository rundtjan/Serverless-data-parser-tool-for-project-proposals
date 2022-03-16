
const reducer = (state=[], action) => {
  switch(action.type) {
  case 'SET_HIGHLIGHTED_WORDS':
    return [...state, action.word]
  case 'CLEAR_HIGHLIGHTED_WORDS':
    return state.filter(w => w !== action.word)
  case 'CLEAR_ALL':
    return []
  default:
    return state
  }
}

export const addHighlightedWord = (word) => {
  return async dispatch => {
    dispatch({
      type: 'SET_HIGHLIGHTED_WORDS',
      word
    })
  }
}

export const clearHighlightedWords = (word) => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_HIGHLIGHTED_WORDS',
      word
    })
  }
}

export const clearAllHighlights = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_ALL'
    })
  }
}

export default reducer