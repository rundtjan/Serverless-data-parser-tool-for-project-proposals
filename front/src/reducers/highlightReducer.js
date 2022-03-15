/*
Should rename clearHighligtedWords
Should rename clear_highlighted_words
Fix imports after rename


*/
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

/**
 * Adds word to the highlight list
 * - Words in the list are highlighted in Messages
 * - Used in Word.js
 * @param {String} word
 */
export const addHighlightedWord = (word) => {
  return {
    type: 'SET_HIGHLIGHTED_WORDS',
    word
  }
}

/**
 * Removes word from the highlight list
 * - Used in Word.js
 * @param {*} word
 */
export const clearHighlightedWords = (word) => {
  return {
    type: 'CLEAR_HIGHLIGHTED_WORDS',
    word
  }
}

/**
 * Removes all the words from the highlight list
 * Used: Word.js and pages
 */
export const clearAllHighlights = () => {
  return {
    type: 'CLEAR_ALL'
  }
}

export default reducer