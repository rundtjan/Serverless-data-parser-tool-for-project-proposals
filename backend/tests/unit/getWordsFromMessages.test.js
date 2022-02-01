const wordsFromMessages =
  require('../../utils/filterSlackResponse').GetWordsFromMessages

const testJson = require('./dataForWordTest.json')
const { singleMessage, messages, emojis } = require('./constants')

test('Words are returned correctly from test data', () => {
  const result = wordsFromMessages(messages)
  expect(result.length).toBe(13)
})

test('Emojis are not counted as words', () => {
  const result = wordsFromMessages(emojis)
  expect(result.length).toBe(0)
})

test('No messages return an empty list of words', () => {
  const messages = []
  const result = wordsFromMessages(messages)
  expect(result.length).toBe(0)
})

test('Words from threads are added', () => {
  const response = wordsFromMessages(testJson)
  expect(response.length).toBe(41)
})

test('Word count uses all messages including threads', () => {
  const response = wordsFromMessages(testJson)
  expect(response[0].count).toBe(5)
  expect(response[2].word).toBe('kissa')
})

test('Word is converted to lowercase', () => {
  const response = wordsFromMessages(singleMessage)
  expect(response[0]).toMatchObject({ word: 'hi' })
})

test('Special character is removed', () => {
  const response = wordsFromMessages(singleMessage)
  expect(response[1]).toMatchObject({ word: 'everyone' })
})

test('Word object is on correct format', () => {
  const response = wordsFromMessages(singleMessage)
  expect(response[1]).toStrictEqual({
    word: 'everyone',
    message_ids: ['e680e4bf-59b2-4f1c-b0fc-43a183b350d7'],
    count: 1,
    important: false,
  })
})
