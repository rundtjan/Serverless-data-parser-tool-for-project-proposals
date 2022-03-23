import assignReducer, { unAssignWord, editAssignedWord, clearAssignedWords, setAssignedWord } from '../reducers/assignReducer'
import deepFreeze from 'deep-freeze'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])


describe('assignReducer ADD_ASSIGNED', () => {
  test('ADD_ASSIGNED adds word-category pair to the state 1', () => {
    const state = []
    const action = {
      type: 'ADD_ASSIGNED',
      data: {
        word: 'testword',
        category: 'testcategory',
      }
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = assignReducer(state, action)

    expect(newState).toContain(action.data)
    expect(newState).toEqual([{ word: 'testword', category: 'testcategory' }])
  })

  test('ADD_ASSIGNED adds word-category pair to the state 2', () => {
    const state = [{ word: 'test', category: 'testing' }]
    const action = {
      type: 'ADD_ASSIGNED',
      data: {
        word: 'testword',
        category: 'testcategory',
      }
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = assignReducer(state, action)

    expect(newState).toContain(action.data)
    expect(newState).toEqual([{  word: 'test', category: 'testing' }, { word: 'testword', category: 'testcategory' }])
  })

  test('ADD_ASSIGNED updates category if word in some category already', () => {
    const state = [{ word: 'test', category: 'testing' }]
    const action = {
      type: 'ADD_ASSIGNED',
      data: {
        word: 'Test',
        category: 'Customer'
      }
    }

    deepFreeze(state)

    const newState = assignReducer(state, action)
    expect(newState.length).toBe(1)
    expect(newState).toEqual([{  word: 'Test', category: 'Customer' }])
  })
})

describe('assignReducer setAssignedWord', () => {

  const initialState = [{ word: 'Customer oy', category: 'customer' }]
  const store = mockStore(initialState)

  test('setAssignedWord dispatches correct action', () => {
    const word = '14.2.2021'
    const category = 'deadline'

    store.dispatch(setAssignedWord(word, category))

    const actions = store.getActions()
    const expectedPayload = { type: 'ADD_ASSIGNED', data: { word, category } }

    expect(actions).toEqual([expectedPayload])
  })

  test('setAssignedWord adds correct data to the state', () => {
    const word = '14.2.2021'
    const category = 'deadline'

    const action = store.dispatch(setAssignedWord(word, category))

    deepFreeze(initialState)

    const newState = assignReducer(initialState, action)

    expect(newState).toEqual([{ word: 'Customer oy', category: 'customer' }, { word: '14.2.2021', category: 'deadline' } ])
  })
})

describe('assignReducer DEL_ASSIGNED', () => {
  test('DEL_ASSIGNED deletes word from assignedlist 1', () => {
    const state = [{ word: 'testword', category: 'testcategory' }]
    const action = {
      type: 'DEL_ASSIGNED',
      word: 'TestWord'
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = assignReducer(state, action)

    expect(newState.length).toBe(0)
    expect(newState).toEqual([])
  })

  test('DEL_ASSIGNED deletes word from assignedlist 2', () => {
    const state = [{ word: 'testword', category: 'testcategory' }, { word: 'word', category: 'category' }]
    const action = {
      type: 'DEL_ASSIGNED',
      word: 'word'
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = assignReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toEqual([{ word: 'testword', category: 'testcategory' }])
  })
})

describe('assignReducer unAssignWord', () => {
  const initialState = [{ word: 'Customer oy', category: 'customer' }, { word: 'Orion oy', category: 'customer' } ]
  const store = mockStore(initialState)

  test('unAssignWord dispatches correct action', () => {
    const word = 'Customer oy'

    store.dispatch(unAssignWord(word))

    const actions = store.getActions()
    const expectedPayload = { type: 'DEL_ASSIGNED', word }

    expect(actions).toEqual([expectedPayload])
  })

  test('unAssignWord removes correct data from state', () => {
    const word = 'customer oy'

    const action = store.dispatch(unAssignWord(word))

    deepFreeze(initialState)

    const newState = assignReducer(initialState, action)

    expect(newState).toEqual([{ word: 'Orion oy', category: 'customer' } ])
  })
})

describe('assignReducer CLEAR_ASSIGNED', () => {
  test('CLEAR_ASSIGNED deletes all words from assignedlist', () => {
    const state = [{ 'word': 'testword', 'category': 'testcategory' }, { 'word': 'another word', 'category': 'another category' }]
    const action = {
      type: 'CLEAR_ASSIGNED',
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = assignReducer(state, action)

    expect(newState).toHaveLength(0)
  })
})

describe('assignReducer clearAssignedWords', () => {
  const initialState = [{ word: '14.2.2021', category: 'deadline' }, { word: 'Customer oy', category: 'customer' }]
  const store = mockStore(initialState)

  test('clearAssignedWords dispatches correct action', () => {
    store.dispatch(clearAssignedWords())

    const actions = store.getActions()
    const expectedPayload = { type: 'CLEAR_ASSIGNED' }

    expect(actions).toEqual([expectedPayload])
  })

  test('clearAssignedWords updates store correctly', () => {
    const action = store.dispatch(clearAssignedWords())

    deepFreeze(initialState)

    const newState = assignReducer(initialState, action)
    expect(newState).toEqual([])
  })
})

describe('assignReducer EDIT_ASSIGNED', () => {
  test('EDIT_ASSIGNED 1', () => {
    const state = [{ 'word': '20.4.2022', 'category': 'deadline' }]
    const action = {
      type: 'EDIT_ASSIGNED',
      data: {
        word: '20.4.2022',
        edited: '31.4.2023'
      }
    }

    deepFreeze(state)
    const newState = assignReducer(state, action)
    const editedWord = newState[0].word

    expect(editedWord).toBe('31.4.2023')
  })

  test('EDIT_ASSIGNED 2', () => {
    const state = [{ 'word': '1.1.2023', 'category': 'deadline' }, { 'word': '100€', 'category': 'budjet' }]
    const action = {
      type: 'EDIT_ASSIGNED',
      data: {
        word: '100€',
        edited: '2000€'
      }
    }

    deepFreeze(state)
    const newState = assignReducer(state, action)

    const first = newState[0]
    const second = newState[1]

    expect(first.word).toBe('1.1.2023')
    expect(first.category).toBe('deadline')

    expect(second.word).toBe('2000€')
    expect(second.category).toBe('budjet')
  })

  test('EDIT_ASSIGNED 3', () => {
    const state = [{ 'word': '1.1.2023', 'category': 'deadline' }, { 'word': '100€', 'category': 'budjet' }, { 'word': '1.1.2023', 'category': 'startdate' }]
    const action = {
      type: 'EDIT_ASSIGNED',
      data: {
        word: '1.1.2023',
        edited: '20.2.2021'
      }
    }

    deepFreeze(state)
    const newState = assignReducer(state, action)

    const first = newState[0]
    const second = newState[1]
    const third = newState[2]

    expect(first.word).toBe('20.2.2021')
    expect(first.category).toBe('deadline')

    expect(second.word).toBe('100€')
    expect(second.category).toBe('budjet')

    expect(third.word).toBe('20.2.2021')
    expect(third.category).toBe('startdate')
  })
})

describe('assignReducer editAssignedWord', () => {

  const initialState = [{ word: '14.2.2021', category: 'deadline' }, { word: 'Customer oy', category: 'customer' }]
  const store = mockStore(initialState)

  test('editAssignedWord dispatches correct action', () => {
    const word = '14.2.2021'
    const edited = '15.2.2022'

    store.dispatch(editAssignedWord(word, edited))

    const actions = store.getActions()
    const expectedPayload = { type: 'EDIT_ASSIGNED', data: { word, edited } }

    expect(actions).toEqual([expectedPayload])
  })

  test('editAssignedWord updates store correctly', () => {
    const word = '14.2.2021'
    const edited = '15.2.2022'

    const action = store.dispatch(editAssignedWord(word, edited))

    deepFreeze(initialState)

    const newState = assignReducer(initialState, action)

    expect(newState).toEqual([{ word: '15.2.2022', category: 'deadline' }, { word: 'Customer oy', category: 'customer' }])
  })
})