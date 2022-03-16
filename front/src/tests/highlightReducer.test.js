import highlightReducer, { addHighlightedWord, clearHighlightedWord, clearAllHighlights } from '../reducers/highlightReducer'
import deepFreeze from 'deep-freeze'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('highlightReducer ADD_HIGHLIGHTED_WORD', () => {

  test('ADD_HIGHLIGHTED_WORD adds correct word when empty state', () => {
    const word = 'Lorem ipsum'
    const state = []
    const action = {
      type: 'ADD_HIGHLIGHTED_WORD',
      word
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toEqual([word])
  })

  test('ADD_HIGHLIGHTED_WORD adds correct word when state has a word', () => {
    const word = 'Lorem'
    const state = ['Ipsum']
    const action = {
      type: 'ADD_HIGHLIGHTED_WORD',
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
    const expectedPayload = { type: 'ADD_HIGHLIGHTED_WORD', word }

    expect(actions).toEqual([expectedPayload])
  })

  test('addHighlightedWord adds the word to the state', () => {
    const word = 'Customer oy'

    const action = store.dispatch(addHighlightedWord(word))

    deepFreeze(initialState)

    const newState = highlightReducer(initialState, action)

    expect(newState).toEqual(['11.4.2021', '100€', 'Customer oy'])
    expect(newState.length).toBe(3)
  })
})

describe('highlightReducer CLEAR_ALL', () => {

  test('CLEAR_ALL clears all 1', () => {
    const state = ['11.4.2021']
    const action = {
      type: 'CLEAR_ALL',
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(0)
    expect(newState).toEqual([])
  })

  test('CLEAR_ALL clears all 2', () => {
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

describe('highlightReducer clearAllHighlights', () => {
  const initialState = ['11.4.2021', '100€']
  const store = mockStore(initialState)

  test('clearAllHighlights dispatches correct action', () => {
    store.dispatch(clearAllHighlights())

    const action = store.getActions()
    const expectedPayload = { type: 'CLEAR_ALL' }

    expect(action).toEqual([expectedPayload])
  })

  test('clearAllHighlights clears the state', () => {

    const action = store.dispatch(clearAllHighlights())

    deepFreeze(initialState)

    const newState = highlightReducer(initialState, action)

    expect(newState).toEqual([])
    expect(newState.length).toBe(0)
  })
})

describe('highlightReducer CLEAR_HIGHLIGHTED_WORD', () => {

  test('CLEAR_HIGHLIGHTED_WORD clears the word', () => {
    const word = '11.4.2021'
    const state = ['11.4.2021']
    const action = {
      type: 'CLEAR_HIGHLIGHTED_WORD',
      word
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(0)
    expect(newState).toEqual([])
  })

  test('CLEAR_HIGHLIGHTED_WORD clears the word', () => {
    const word = 'Lorem ipsum dolor jotain'
    const state = ['11.4.2021', 'Somethhing', 'Lorem ipsum dolor jotain']
    const action = {
      type: 'CLEAR_HIGHLIGHTED_WORD',
      word
    }

    deepFreeze(state)

    const newState = highlightReducer(state, action)

    expect(newState.length).toBe(2)
    expect(newState).toEqual(['11.4.2021', 'Somethhing'])
  })
})

describe('highlightReducer clearHighlightedWord', () => {
  const initialState = ['11.4.2021', '100€']
  const store = mockStore(initialState)

  test('clearHighlightedWord dispatches correct action', () => {
    const word = '11.4.2021'

    store.dispatch(clearHighlightedWord(word))

    const actions = store.getActions()
    const expectedPayload = { type: 'CLEAR_HIGHLIGHTED_WORD', word }

    expect(actions).toEqual([expectedPayload])
  })

  test('clearHighlightedWord dispatches correct action', () => {
    const word = '100€'

    const action = store.dispatch(clearHighlightedWord(word))

    deepFreeze(initialState)

    const newState = highlightReducer(initialState, action)

    expect(newState).toEqual(['11.4.2021'])
    expect(newState.length).toBe(1)
  })
})