const wordsFromMessages =
  require('../../utils/filterSlackResponse').GetWordsFromMessages

test('Words are returned correctly from test data', () => {
  const messages = [
    {
      client_msg_id: 'e680e4bf-59b2-4f1c-b0fc-43a183b350d7',
      type: 'message',
      text: ':wave: Hi everyone!',
      user: 'U02UF7S2DN1',
      ts: '1642531226.000400',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
    {
      client_msg_id: '5f4c8f69-e34b-42d0-b16e-f16d4c046497',
      type: 'message',
      text: 'kissa on suomen suosituin kotieläin',
      user: 'U02UHPPRMJ6',
      ts: '1642527720.000700',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
      reactions: [[Object]],
    },
    {
      client_msg_id: 'f8a24f03-ca58-4f4d-b1bf-ba8c68ff8063',
      type: 'message',
      text: 'terveppä terve',
      user: 'U02UHPPRMJ6',
      ts: '1642527711.000400',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
    {
      client_msg_id: '727f403c-f840-4735-abc4-654471c549ed',
      type: 'message',
      text: 'Message massage',
      user: 'U02UAB8HUFM',
      ts: '1642509866.000800',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
    {
      client_msg_id: '0b990549-d16b-4ede-a1d5-19fcfa9255ae',
      type: 'message',
      text: 'Diba daba',
      user: 'U02UAB8HUFM',
      ts: '1642509861.000600',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
  ]
  const result = wordsFromMessages(messages)
  expect(result.length).toBe(13)
})

test('Emojis are not counted as words', () => {
  const emojis = [
    {
      client_msg_id: 'e680e4bf-59b2-4f1c-b0fc-43a183b350d7',
      type: 'message',
      text: ':wave: :thumbsup:',
      user: 'U02UF7S2DN1',
      ts: '1642531226.000400',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
    {
      client_msg_id: '5f4c8f69-e34b-42d0-b16e-f16d4c046497',
      type: 'message',
      text: ':innocent: :kissing_heart:',
      user: 'U02UHPPRMJ6',
      ts: '1642527720.000700',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
      reactions: [[Object]],
    },
  ]
  const result = wordsFromMessages(emojis)
  expect(result.length).toBe(0)
})

test('No messages return an empty list of words', () => {
  const messages = []
  const result = wordsFromMessages(messages)
  expect(result.length).toBe(0)
})
