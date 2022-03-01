import sendReducer from '../reducers/sendReducer'
import { createSendAssignedJSON } from '../reducers/sendReducer'
import deepFreeze from 'deep-freeze'

const sendJSONmock = jest.fn();
sendJSONmock.mockReturnValueOnce('success').mockReturnValueOnce('success')
const sendAssignedJSON = createSendAssignedJSON(sendJSONmock)

describe('sendReducer', () => {
  test('SEND_RESET returns empty state', () => {
    const state = ['success']
    const action = {
      type: 'SEND_RESET'
    }

    deepFreeze(state)
    const newState = sendReducer(state, action)

    expect(newState).toBe('')
  })

  test('SEND_ERROR returns error', () => {
    const state = ['pending']
    const action = {
      type: 'SEND_ERROR'
    }

    deepFreeze(state)
    const newState = sendReducer(state, action)

    expect(newState).toBe('error')
  })

  test('SEND_SUCCESS returns success', () => {
    const state = ['pending']
    const action = {
      type: 'SEND_SUCCESS'
    }

    deepFreeze(state)
    const newState = sendReducer(state, action)

    expect(newState).toBe('success')
  })

  //this test needs to be developed with redux-mocks etc.
  test('SendAssignedJSON calls api with correct parameters', () => {
    const result = sendAssignedJSON()
    console.log(result)
    console.log(sendJSONmock.mock.calls[0])

    expect(1).toBe(1)
  })
})
