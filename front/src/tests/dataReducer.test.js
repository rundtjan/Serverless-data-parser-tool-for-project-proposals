import dataReducer from '../reducers/dataReducer'
import deepFreeze from 'deep-freeze'


describe('dataReducer', () => {
  test('INIT_MESSAGES returns correct state', () => {
    const state = []
    const action = {
      type: 'INIT_MESSAGES',
      data: {
        message: 'Test message',
        user: {
          username: 'Tester',
          name: 'Alan Turing'
        },
      }
    }

    deepFreeze(state)
    const newState = dataReducer(state, action)

    expect(newState).toBe(action.data)
  })
})