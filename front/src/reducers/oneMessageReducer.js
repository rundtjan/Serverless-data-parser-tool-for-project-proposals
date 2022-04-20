const reducer = (state = 'do_nothing', action) => {
  switch(action.type) {
  case 'SET_EXECUTE':
    return 'execute'
  case 'SET_DO_NOTHING':
    return 'do_nothing'
  default:
    return state
  }
}

export const setOneMessage = () => {
  return {
    type: 'SET_EXECUTE'
  }
}

export const setDoNothing = () => {
  return {
    type: 'SET_DO_NOTHING'
  }
}


export default reducer