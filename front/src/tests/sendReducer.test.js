import sendReducer from '../reducers/sendReducer'
import { createSendAssignedJSON } from '../reducers/sendReducer'
import deepFreeze from 'deep-freeze'

/**A mock dispatch function in order to test that dispatch within an action gets called with the correct value */
const mockDispatch = jest.fn()
/**A mock to retrieve the args being passed to the mock api-call mockGet below */
const mockCalls = jest.fn()

/**
 * This is a mock of an async api-call with response.
 * @param {*} args can be any arguments passed to the mock-api-call.
 * @returns a promise - use await mockGet in the test to resolve.
 */
const mockGet = async (args) => {
  mockCalls(args)
  let myPromise = new Promise(function(resolve) {
    resolve({ status: 'success' })
  })
  return myPromise
}

/**
 * This is a mock of an async api-call which returns the signal of a failure in the call.
 * @param {*} args can be any arguments passed to the mock-api-call.
 * @returns a promise - use await mockGet in the test to resolve.
 */
const errorMockGet = async (args) => {
  mockCalls(args)
  let myPromise = new Promise(function(resolve) {
    resolve('error')
  })
  return myPromise
}

const sendAssignedJSON = createSendAssignedJSON(mockGet)

const errorSendAssignedJSON = createSendAssignedJSON(errorMockGet)

/** Mocks the redux function getState, returns list of words */
const getState = () => {
  return { 'assignedWords': ['hello'] }
}

/** Mocks the redux function getState, returns empty list */
const getEmptyState = () => {
  return { 'assignedWords': [] }
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
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SEND_SUCCESS' })
  })

  test('SendAssignedJSON dispatches SEND_ERROR if resonpse from api-call is error', async () => {
    const funk = errorSendAssignedJSON()
    await funk(mockDispatch, getState)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SEND_ERROR' })
  })

  test('SendAssignedJSON dispatches SEND_ERROR if no words are chosen', async () => {
    const funk = errorSendAssignedJSON()
    await funk(mockDispatch, getEmptyState)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SEND_ERROR' })
  })
})
