import { escapeRegExp, tokenWord, patternHighlights, splitTextByHighlights } from '../utils/helper'

describe('escapeRegExp', () => {
  test('escapes correctly c++', () => {
    const word = 'c++'
    const result = escapeRegExp(word)

    expect(result).toBe('c\\+\\+')
  })

  test('escapes correctly f', () => {
    const word = 'f'
    const result = escapeRegExp(word)

    expect(result).toBe('f')
  })

  test('escapes correctly f', () => {
    const word = 'F#'
    const result = escapeRegExp(word)

    expect(result).toBe('F\\#')
  })
})

describe('tokenWord', () => {
  test('adds tokens correctly to c++', () => {
    const word = 'c++'
    const result = tokenWord(word)

    expect(result).toBe('\\bc\\+\\+\\B')
  })

  test('adds tokens correctly to .NET', () => {
    const word = '.NET'
    const result = tokenWord(word)

    expect(result).toBe('\\B\\.NET\\b')
  })

  test('adds tokens correctly to Customer', () => {
    const word = 'Customer'
    const result = tokenWord(word)

    expect(result).toBe('\\bCustomer\\b')
  })

  test('adds tokens correctly to F', () => {
    const word = 'F'
    const result = tokenWord(word)

    expect(result).toBe('\\bF\\b')
  })
})

describe('patternHighlights', () => {
  test('patterns highlights correctly', () => {
    const highlights = ['C++', '.NET', 'Customer']
    const result = patternHighlights(highlights)
    const ans = '\\bC\\+\\+\\B|\\B\\.NET\\b|\\bCustomer\\b'

    expect(result).toBe(ans)
  })

  test('patterns highlights correctly 2', () => {
    const highlights = ['C++', 'C', 'F', 'F#']
    const result = patternHighlights(highlights)
    const ans = '\\bC\\+\\+\\B|\\bC\\b|\\bF\\b|\\bF\\#\\B'

    expect(result).toBe(ans)
  })
})


describe('splitTextByHighlights', () => {
  test('splits text correctly 1', () => {
    const highlights = ['C++', '.NET', 'Customer']
    const text = 'Customer wants c++ in app'
    const result = splitTextByHighlights(text, highlights)
    const ans = ['', 'Customer', ' wants ', 'c++', ' in app']

    expect(result).toEqual(ans)
  })

  test('splits text correctly 2', () => {
    const highlights = ['C++', '.NET', 'Customer']
    const text = 'What if there is no matches'
    const result = splitTextByHighlights(text, highlights)
    const ans = ['What if there is no matches']

    expect(result).toEqual(ans)
  })

  test('splits text correctly 3', () => {
    const highlights = ['C++', '.NET', 'Customer']
    const text = 'Someone told me that there is .NET'
    const result = splitTextByHighlights(text, highlights)
    const ans = ['Someone told me that there is ', '.NET', '']

    expect(result).toEqual(ans)
  })

  test('splits text correctly 4', () => {
    const highlights = ['C++', '.NET', 'Customer']
    const text = 'Customers wants c++ in app, but not the x.NET'
    const result = splitTextByHighlights(text, highlights)
    const ans = ['Customers wants ', 'c++', ' in app, but not the x.NET']

    expect(result).toEqual(ans)
  })

  test('splits text correctly 5', () => {
    const highlights = ['11.02.2004', '100.00€', 'Customer']
    const text = 'Deadline 11.02.2004. Price 100.00€ per hour'
    const result = splitTextByHighlights(text, highlights)
    const ans = ['Deadline ', '11.02.2004', '. Price ', '100.00€', ' per hour']

    expect(result).toEqual(ans)
  })

  test('splits text correctly 6', () => {
    const highlights = ['11.02.2004', '100 €', 'Customer']
    const text = 'Deadline 11.02.2004. Price 100 € per hour'
    const result = splitTextByHighlights(text, highlights)
    const ans = ['Deadline ', '11.02.2004', '. Price ', '100 €', ' per hour']

    expect(result).toEqual(ans)
  })
})
