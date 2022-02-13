const wordsFromMessages =
  require('../../application/filterSlackResponse').GetWordsFromMessages

const testJson = require('./dataForWordTest.json')
const { singleMessage, messages, emojis } = require('./testMessages')

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
    category: '',
  })
})

test('amounts are correct', () => {
  const msg = [
    {
      client_msg_id: 'e72bf69f-2ee5-4feb-834f-1d08bdd44364',
      type: 'message',
      text: '5000€, 5.000€, 5.000,00€, 5.000€ tai €5.000',
      user: 'U02UF7S2DN1',
      ts: '1643362475.606779',
      team: 'T02UNV7V4GZ',
      blocks: [],
      real_name: 'User5',
      thread_array: [],
    },
  ]
  const response = wordsFromMessages(msg)
  expect(response[0].word).toBe('5.000€')
  expect(response[0].count).toBe(2)
  expect(response[1].word).toBe('5000€')
  expect(response[2].word).toBe('5.000,00€')
  expect(response[3].word).toBe('tai')
  expect(response[4].word).toBe('€5.000')
})
test('Company suffix is added to previous word', () => {
  const response = wordsFromMessages([
    {
      client_msg_id: 'e680e4bf-59b2-4f1c-b0fc-43a183b350d8',
      type: 'message',
      text: 'Oy Jrt Ab 2.700€. Osakeyhtiö Oy tai yhtiö co.',
      user: 'U02UF7S2DN1',
      ts: '1642531226.000400',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
  ])
  expect(response[0]['word']).toEqual('oy jrt ab')
  expect(response[1]['word']).toEqual('2.700€')
  expect(response[2]['word']).toEqual('osakeyhtiö oy')
  expect(response[4]['word']).toEqual('yhtiö co')
})
test('short messages are returned correctly', () => {
  const response = wordsFromMessages([
    {
      client_msg_id: 'e680e4bf-59b2-4f1c-b0fc-43a183b350d9',
      type: 'message',
      text: 'Oy Ab',
      user: 'U02UF7S2DN1',
      ts: '1642531226.000400',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
  ])
  expect(response[0]['word']).toEqual('oy')
  expect(response[1]['word']).toEqual('ab')
})
// test('empty message returns []', () => {
//   const res = wordsFromMessages([
//     {
//       client_msg_id: 'e680e4bf-59b2-4f1c-b0fc-43a183b350d11',
//       type: 'message',
//       text: '',
//       user: 'U02UF7S2DN1',
//       ts: '1642531226.000400',
//       team: 'T02UNV7V4GZ',
//       blocks: [[Object]],
//     },
//   ])
//   expect(res).toStrictEqual([])
// })
