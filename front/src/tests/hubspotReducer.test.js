import hubspotReducer from '../reducers/hubspotReducer'
import deepFreeze from 'deep-freeze'

describe('hubspotReducer SET_DEALS', () => {

  test('SET_DEALS adds correct data to the state', () => {
    const deals = [{ customer: 'Test company', description: 'Lorem ipsum' }, { customer: 'Eficode oy', description: 'Lorem ipsum something' }]
    const state = []
    const action = {
      type: 'SET_DEALS',
      data: deals
    }

    deepFreeze(state)

    const newState = hubspotReducer(state, action)

    expect(newState.length).toBe(2)
    expect(newState).toEqual(deals)
  })
})
