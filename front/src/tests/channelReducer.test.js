import channelReducer from '../reducers/channelReducer'
import deepFreeze from 'deep-freeze'

describe('channelReducer', () => {
  test('INIT_CHANNELS retuns correct state', () => {
    const state = []
    const action = {
      type: 'INIT_CHANNELS',
      data: [
        'general',
        'random',
        'testing'
      ]
    }

    deepFreeze(state)
    const newState = channelReducer(state, action)

    expect(newState).toBe(action.data)
    expect(newState.length).toBe(3)
  })
})