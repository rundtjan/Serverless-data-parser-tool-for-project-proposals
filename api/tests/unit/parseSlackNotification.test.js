const response = require('../../utils/parseSlackNotification')

test('parseSlackNotification returns an object', () => {
  const obj = response('customer', 'update', 'thread', 'www.google.com', 'a deal')
  expect(typeof(obj)).toBe('object')
})

test('parseSlackNotification uses the customer-name', () => {
  const obj = response('test company', 'update', 'thread', 'www.google.com', 'a deal')
  expect(obj[0].text.text.includes('A deal with customer test company')).toBe(true)
})

test('parseSlackNotification uses the action-parameter', () => {
  const obj = response('test company', 'updated', 'thread', 'www.google.com', 'a deal')
  expect(obj[0].text.text.includes('has been updated in Hubspot')).toBe(true)
})

test('parseSlackNotification uses the type-parameter', () => {
  const obj = response('test company', 'updated', 'thread', 'www.google.com', 'a deal')
  expect(obj[0].text.text.includes('based on data from this thread')).toBe(true)
  const obj2 = response('test company', 'updated', 'channel', 'www.google.com', 'a deal')
  expect(obj2[0].text.text.includes('based on data from this channel')).toBe(true)
})

test('parseSlackNotification constructs a dealname if no dealname-parameter', () => {
  const obj = response('test company', 'updated', 'thread', 'www.google.com')
  expect(obj[1].text.text.includes('The deal is called: \'Deal test company')).toBe(true)
})

test('parseSlackNotification uses the dealname-parameter if present', () => {
  const obj = response('test company', 'updated', 'thread', 'www.google.com', 'The dealname')
  expect(obj[1].text.text.includes('The deal is called: \'The dealname')).toBe(true)
})

test('parseSlackNotification uses the link-parameter', () => {
  const obj = response('test company', 'updated', 'thread', 'www.google.com', 'The dealname')
  expect(obj[2].text.text.includes('View it in Hubspot at: www.google.com')).toBe(true)
})
