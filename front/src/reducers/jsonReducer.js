const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CLEAR_JSON':
    return null
  case 'UPDATE_JSON':
    console.log('action.data ' + JSON.stringify(action.data))
    return action.data
  default:
    return state
  }
}

export const updateJson = (assignedWords) => {
  console.log('assigned ' + assignedWords.length)
  const data = makeJson(assignedWords)
  return async dispatch => {
    dispatch( {
      type: 'UPDATE_JSON',
      data
    })
  }
}

export const clearJson = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_JSON',
    })
  }
}
const makeJson = (assignedWords) => {
  const JSONObj = {}
  assignedWords.forEach(word => {
    if (!JSONObj[word.category]) JSONObj[word.category] = []
    JSONObj[word.category].push(word.word)
  })
  return JSONObj

}
export default reducer