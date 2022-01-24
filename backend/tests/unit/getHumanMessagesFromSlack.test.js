const humanMessagesFromSlack =
  require('../../utils/filterSlackResponse').GetHumanMessagesFromSlack

test('empty list of messages is empty', () => {
  const messages = []
  const result = humanMessagesFromSlack(messages)
  expect(result).toEqual([])
})

test('list of messages is returned correctly', () => {
  const messages = [
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
  ]
  const result = humanMessagesFromSlack(messages)
  expect(result.length).toBe(2)
  expect(messages).not.toBeNull()
  expect(messages).not.toBeUndefined()
})

test('returned list is empty if no client_msg_id field', () => {
  const messages = [
    {
      type: 'message',
      text: 'kissa on suomen suosituin kotieläin',
      user: 'U02UHPPRMJ6',
      ts: '1642527720.000700',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
      reactions: [[Object]],
    },
    {
      type: 'message',
      text: 'terveppä terve',
      user: 'U02UHPPRMJ6',
      ts: '1642527711.000400',
      team: 'T02UNV7V4GZ',
      blocks: [[Object]],
    },
  ]
  const result = humanMessagesFromSlack(messages)
  expect(result.length).toBe(0)
})
