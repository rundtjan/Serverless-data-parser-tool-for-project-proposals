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