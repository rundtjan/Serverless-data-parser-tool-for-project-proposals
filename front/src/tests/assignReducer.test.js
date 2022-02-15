import assignReducer from '../reducers/assignReducer'
import deepFreeze from 'deep-freeze'


describe('assignReducer', () => {
  test('ADD_ASSIGNED adds word to assignedlist', () => {
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
  })
})

describe('assignReducer', () => {
  test('DEL_ASSIGNED deletes word from assignedlist', () => {
    const state = [{ 'word': 'testword', 'category': 'testcategory' }]
    const action = {
      type: 'DEL_ASSIGNED',
      data: {
        word: 'Testword',
        category: 'testcategory',
      }
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = assignReducer(state, action)

    expect(newState).not.toContain(action.data)
  })
})

describe('assignReducer', () => {
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