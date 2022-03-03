import sendReducer from '../reducers/sendReducer'
import { createSendAssignedJSON } from '../reducers/sendReducer'
import deepFreeze from 'deep-freeze'

const mockDispatch = jest.fn()
const mockCalls = jest.fn()

//own async mock function to replace axios.get, because standard library not cooperating
const mockGet = async (args) => {
  mockCalls(args)
  let myPromise = new Promise(function(resolve) {
    resolve('success');
  });
  return myPromise
}

const errorMockGet = async (args) => {
  mockCalls(args)
  let myPromise = new Promise(function(resolve) {
    resolve('error');
  });
  return myPromise
}

const sendAssignedJSON = createSendAssignedJSON(mockGet)

const errorSendAssignedJSON = createSendAssignedJSON(errorMockGet)

const getState = () => {
  return { 'assignedWords': ['hello'] }
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

  test('SendAssignedJSON calls api with correct parameters', async () => {
    const funk = sendAssignedJSON()
    await funk(mockDispatch, getState)
    expect(mockCalls).toHaveBeenCalledWith(['hello'])
  })

  test('SendAssignedJSON dispatches SEND_SUCCESS if response from api-call is success', async () => {
    const funk = sendAssignedJSON()
    await funk(mockDispatch, getState)
    expect(mockDispatch).toHaveBeenCalledWith({type: 'SEND_SUCCESS'})
  })

  test('SendAssignedJSON dispatches SEND_ERROR if resonpse from api-call is error', async () => {
    const funk = errorSendAssignedJSON()
    await funk(mockDispatch, getState)
    expect(mockDispatch).toHaveBeenCalledWith({type: 'SEND_ERROR'})
  })
})
