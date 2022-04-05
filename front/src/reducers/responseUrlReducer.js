const reducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_URL':
    return action.url
  default:
    return state
  }
}


export const setUrl = (id) => {
  const rgx = /\$/gi
  var url = ''
  if (id.includes('type=thread')){
    //url = id.split('&type')[0].replace(rgx, '/').split('Url=')[1]
    console.log('no url yet')
  } else {
    url = id.split('&channel')[0].replace(rgx, '/').split('Url=')[1]
  }
  return {
    type: 'INIT_URL',
    url
  }
}


export default reducer