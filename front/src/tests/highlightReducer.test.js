/* eslint-disable no-unused-vars */
import highlightReducer, { addHighlightedWord } from '../reducers/highlightReducer'
import deepFreeze from 'deep-freeze'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('highlightReducer SET_HIGHLIGHTED_WORDS', () => {

  test('SET_HIGHLIGHTED_WORDS adds correct word when empty state', () => {
    const word = 'Lorem ipsum'
    const state = []
    const action = {
      type: 'SET_HIGHLIGHTED_WORDS',
      word
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toEqual([word])
  })

  test('SET_HIGHLIGHTED_WORDS adds correct word when state has a word', () => {
    const word = 'Lorem'
    const state = ['Ipsum']
    const action = {
      type: 'SET_HIGHLIGHTED_WORDS',
      word
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(2)
    expect(newState).toEqual([...state, word])
  })
})

describe('highlightReducer addHighlightedWord', () => {

  const initialState = ['11.4.2021', '100€']
  const store = mockStore(initialState)

  test('addHighlightedWord dispatches correct action', () => {
    const word = 'Customer oy'

    store.dispatch(addHighlightedWord(word))

    const actions = store.getActions()
    const expectedPayload = { type: 'SET_HIGHLIGHTED_WORDS', word }

    expect(actions).toEqual([expectedPayload])
  })

  test('addHighlightedWord dispatches correct action', () => {
    const word = 'Customer oy'

    const action = store.dispatch(addHighlightedWord(word))

    deepFreeze(initialState)

    const newState = highlightReducer(initialState, action)

    expect(newState).toEqual(['11.4.2021', '100€', 'Customer oy'])
    expect(newState.length).toBe(3)
  })
})

describe('highlightReducer CLEAR_ALL', () => {

  test('CLEAR_ALL clear all 1', () => {
    const state = ['11.4.2021']
    const action = {
      type: 'CLEAR_ALL',
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(0)
    expect(newState).toEqual([])
  })

  test('CLEAR_ALL clear all 2', () => {
    const state = ['11.4.2021', 'Somethhing', 'Lorem ipsum dolor jotain']
    const action = {
      type: 'CLEAR_ALL',
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(0)
    expect(newState).toEqual([])
  })
})