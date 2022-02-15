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

describe('dataReducer', () => {
  test('UPDATE_MESSAGES returns correct state', () => {
    const oldMessage = { 'message': 'testmessage' }
    const state = [ oldMessage ]
    const newMessage = { 'message': 'testmessage2' }
    const newMessageArray = [ newMessage ]
    const action = {
      type: 'UPDATE_MESSAGES',
      data: newMessageArray
    }

    deepFreeze(state)
    deepFreeze(newMessage)
    deepFreeze(action)
    const newState = dataReducer(state, action)

    expect(newState).toContain(newMessage)
    expect(newState).toHaveLength(1)
  })
})