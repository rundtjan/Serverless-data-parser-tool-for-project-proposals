
const reducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_ASSIGNED':
    return state.filter(word => word.word.toLowerCase() !== action.data.word.toLowerCase()).concat(action.data)
  case 'DEL_ASSIGNED':
    return state.filter(word => word.word.toLowerCase() !== action.word.toLowerCase())
  case 'EDIT_ASSIGNED': {
    const word = action.data.word
    const edited = action.data.edited
    return state.map(a => a.word === word ? { 'word': edited, 'category': a.category } : a)
  }
  case 'CLEAR_ASSIGNED':
    return []
  default:
    return state
  }
}

/**
 * Assigns given word to the category
 * @param {String} word
 * @param {String} category
 */
export const setAssignedWord = (word, category) => {
  const data = { word, category }
  return {
    type: 'ADD_ASSIGNED',
    data
  }
}

/**
 * Removes word for category
 * @param {String} word
 */
export const unAssignWord = (word) => {
  return {
    type: 'DEL_ASSIGNED',
    word
  }
}

/**
 * Updates the word in the category.
 * @param {String} word old value
 * @param {String} edited new value
 */
export const editAssignedWord = (word, edited) => {
  const data = {
    word,
    edited
  }
  return {
    type: 'EDIT_ASSIGNED',
    data
  }
}

/**
 * Removes all words from all categories
 */
export const clearAssignedWords = () => {
  return {
    type: 'CLEAR_ASSIGNED'
  }
}

export default reducer

