import channelService from '../services/channels'
//import searchService from '../services/searchDeals'

const reducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT_CHANNELS':
    return action.data
  default:
    return state
  }
}

/**
 * Initializes channels for the ParametersForm
 * Used in App.js
 * @see {@link channelService}
 */
export const initializeChannels = () => {
  return async dispatch => {
    const data = await channelService.getChannels()
    //const data2 = await searchService.searchDeals('siirto')
    //console.log(data2)
    dispatch({
      type: 'INIT_CHANNELS',
      data
    })
  }
}

export default reducer