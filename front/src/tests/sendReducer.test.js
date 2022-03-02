import sendReducer from '../reducers/sendReducer'
import { createSendAssignedJSON } from '../reducers/sendReducer'
import deepFreeze from 'deep-freeze'
import mockAxios from "axios";

jest.mock("axios");
mockAxios.get.mockResolvedValue('success')

const mockDispatch = jest.fn()

//const res = mockAxios.get('hello')
//console.log('res', res)
const sendAssignedJSON = createSendAssignedJSON(mockAxios.get)

const getState = () => {
  return {'assignedWords': ['hello']}
}

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
    const funk = sendAssignedJSON()
    funk(mockDispatch, getState)
    expect(mockAxios.get).toHaveBeenCalledWith(['hello'])
    //expect(mockDispatch.mock.calls[0][0]).toBe({type: 'SEND_ERROR'})
    //expect(mockDispatch).toHaveBeenCalledWith({'type': 'SEND_ERROR'})
    console.log(mockDispatch.mock.calls)
    expect(1).toBe(1)
  })
})
