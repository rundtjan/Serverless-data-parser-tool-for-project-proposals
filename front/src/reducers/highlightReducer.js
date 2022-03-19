
const reducer = (state=[], action) => {
  switch(action.type) {
  case 'ADD_HIGHLIGHTED_WORD':
    return [...state, action.word]
  case 'CLEAR_HIGHLIGHTED_WORD':
    return state.filter(w => w !== action.word)
  case 'CLEAR_ALL':
    return []
  default:
    return state
  }
}

/**
 * Adds word to the highlight list
 * - Words in the list are highlighted in Messages
 * - Used in Word.js
 * @param {String} word
 */
export const addHighlightedWord = (word) => {
  return {
    type: 'ADD_HIGHLIGHTED_WORD',
    word
  }
}

/**
 * Removes word from the highlight list
 * - Used in Word.js
 * @param {*} word
 */
export const clearHighlightedWord = (word) => {
  return {
    type: 'CLEAR_HIGHLIGHTED_WORD',
    word
  }
}

/**
 * Removes all the words from the highlight list
 * Used in Pages
 */
export const clearAllHighlights = () => {
  return {
    type: 'CLEAR_ALL'
  }
}

export default reducer