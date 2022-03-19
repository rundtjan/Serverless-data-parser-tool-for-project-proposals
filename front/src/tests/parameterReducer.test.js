import parameterReducer, { updateParameters } from '../reducers/parameterReducer'
import deepFreeze from 'deep-freeze'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('parameterReducer SET_PARAMETERS', () => {
  test('INIT_PARAMETERS sets data to state', () => {
    const state = {}
    const action = {
      type: 'SET_PARAMETERS',
      data: { channel: 'General', user: 'All', hours: 'No limit' } }

    deepFreeze(state)

    const newState = parameterReducer(state, action)

    expect(newState).toEqual({ channel: 'General', user: 'All', hours: 'No limit' })
  })

  test('INIT_PARAMETERS sets data to state', () => {
    const state = { channel: 'Test', user: 'Tester', hours: '24h' }
    const action = {
      type: 'SET_PARAMETERS',
      data: { channel: 'General', user: 'All', hours: 'No limit' } }

    deepFreeze(state)

    const newState = parameterReducer(state, action)

    expect(newState).toEqual({ channel: 'General', user: 'All', hours: 'No limit' })
  })
})

describe('parameterReducer updateParameters', () => {

  const initialState = { channel: 'General', user: 'All', hours: 'No limit' }
  const store = mockStore(initialState)


  test('updateParameters dispatches correct action', () => {

    const data = { channel: 'Test Channel', user: 'All', hours: '24H' }

    store.dispatch(updateParameters(data.channel, data.user, data.hours))

    deepFreeze(initialState)

    const actions = store.getActions()
    const expectedPayload = { type: 'SET_PARAMETERS', data }

    expect(actions).toEqual([expectedPayload])
  })

  test('updateParameters updates state correctly', () => {
    const data = { channel: 'Test Channel', user: 'All', hours: '24H' }

    const action = store.dispatch(updateParameters(data.channel, data.user, data.hours))

    const newState = parameterReducer(initialState.push, action)

    expect(newState).toEqual(data)
  })
})