import hubspotService from '../services/hubspot'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'SET_DEALS':
    return action.data
  default:
    return state
  }
}

/**
 * Gets all the HubSpot deals and sets them to state
 * - Used in: ...
 */
export const getAllHubspotDeals = () => {
  return async dispatch => {
    const data = await hubspotService.getAll()
    dispatch({
      type: 'SET_DEALS',
      data
    })
  }
}

/**
 * Gets all the HubSpot deals associated with the parameter and sets them to state
 * - Used in: ...
 * @param {String} name - name of the customer
 */
export const getAllHubspotDealsWithName = (name) => {
  return async dispatch => {
    const data = await hubspotService.getAllWith(name)
    dispatch({
      type: 'SET_DEALS',
      data
    })
  }
}

export default reducer