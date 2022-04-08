const reducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_RESPONSE_TARGET':
    return action.responseTarget
  default:
    return state
  }
}


export const setResponseTarget = (id) => {
  var responseTarget = {}
  if (id.includes('type=thread')){
    responseTarget.ts = id.split('ts=')[1].split('&channel')[0]
    responseTarget.channel_id = id.split('channel=')[1]
  } else {
    responseTarget.channel_id = id.split('&channel_id=')[1]
  }
  return {
    type: 'INIT_RESPONSE_TARGET',
    responseTarget
  }
}


export default reducer