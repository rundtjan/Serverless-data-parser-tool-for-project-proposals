import { setUserMessage } from '../reducers/userMessageReducer'
import { clearUserMessage } from '../reducers/userMessageReducer'
import reducer from '../reducers/userMessageReducer'
import deepFreeze from 'deep-freeze'


describe('userMessageReducer', () => {

  test('SET_MESSAGE returns correct state', () => {
    const state = ''
    const action = {
      type: 'SET_MESSAGE',
      userMessage: {
        text: 'Test message',
        link: 'https://testurl.com'
      }
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = reducer(state, action)
    expect(newState).toEqual({ text: 'Test message', link: 'https://testurl.com' })
  })

  test('CLEAR_MESSAGE returns correct state', () => {
    const state = { text: 'Test message', link: 'https://testurl.com' }
    const action = {
      type: 'CLEAR_MESSAGE'
    }
    deepFreeze(state)
    deepFreeze(action)
    const newState = reducer(state, action)
    expect(newState).toEqual('')
  })

  test('Action creator setUserMessage', () => {
    const message = {
      text: 'test_text',
      link: 'https://test_url.com'
    }
    const action = setUserMessage(message)
    expect(action).toEqual({
      userMessage: message,
      type: 'SET_MESSAGE'
    })
  })

  test('Action creator clearUserMessage', () => {
    const action = clearUserMessage()
    expect(action).toEqual({
      type: 'CLEAR_MESSAGE'
    })
  })

})