const { filterOutOldMessages } = require('../../utils/filterSlackResponse.js')
var messages = require('./dataForTimefilterTest.json')

test('All messages returned with old enough timestamp', () => {
  const timestamp = 1642847619000000
  const result = filterOutOldMessages(messages, timestamp)
  expect(result.length).toBe(4)
  expect(result[1].thread_array.length).toBe(4)
  expect(result[3].thread_array.length).toBe(2)
})

test('No messages returned with new enough timestamp', () => {
  const timestamp = 1653625219000000
  const result = filterOutOldMessages(messages, timestamp)
  expect(result.length).toBe(0)
})

test('Messages is left out if it is too old', () => {
  const timestamp = 1642934019000000 //stands for 23.1.2022 and there is one older message in testdata
  const result = filterOutOldMessages(messages, timestamp)
  expect(result.length).toBe(3)
  expect(result[0].text).toBe('Tämä on viesti 23.1.')
  expect(result[0].thread_array.length).toBe(4)//threads are newer than 23.1.2022
  expect(result[2].thread_array.length).toBe(2)
})

test('Parentmessage-text replaced if it is too old', () => {
  const timestamp = 1643020419000000 //stands for 24.1.2022 and first threadparent is older than that
  const result = filterOutOldMessages(messages, timestamp)
  expect(result[0].text).toBe(':The-start-of-this-thread-is-outside-of-timelimit')
})

test('Parentmessage-text replaced and thread shortened if too old', () => {
  const timestamp = 1643106819000000 //stands for 25.1.2022 and first threadparent and first message in that thread is older than that
  const result = filterOutOldMessages(messages, timestamp)
  expect(result[0].text).toBe(':The-start-of-this-thread-is-outside-of-timelimit')
  expect(result[0].thread_array.length).toBe(3)
})

test('Only one thread-answer in result and parent-text replaced if very late timelimit', () => {
  const timestamp = 1643625219000000 //stands for 31.1.2022 and only one threadmessage in data is new enough
  const result = filterOutOldMessages(messages, timestamp)
  expect(result.length).toBe(1)
  expect(result[0].text).toBe(':The-start-of-this-thread-is-outside-of-timelimit')
  expect(result[0].thread_array.length).toBe(1)
  expect(result[0].thread_array[0].text).toBe('Tämä on threadvastaus 31.1., viestiin 23.1.')
})

//example dates:
//1643625219000000 -- 31.1.2022
//1643538819000000 -- 30.1.2022
//1643452419000000 -- 29.1.2022
//1643366019000000 -- 28.1.2022
//1643279619000000 -- 27.1
//1643193219000000 -- 26.1
//1643106819000000 -- 25.1
//1643020419000000 -- 24.1
//1642934019000000 -- 23.1
//1642847619000000 -- 22.1