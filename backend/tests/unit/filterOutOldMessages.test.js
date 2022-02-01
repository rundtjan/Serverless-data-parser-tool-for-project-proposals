const { filterOutOldMessages } = require('../../utils/filterSlackResponse.js')
const fs = require('fs')
var messages

//For some reason JSON needs to be imported before every test, otherwise the object is mutated 

beforeEach(() => messages = JSON.parse(fs.readFileSync(__dirname + '/dataForTimefilterTest.json')))

test('With very old timelimit, all messages are included and unchanged', () => {
  const oldest = '1042847619.000000'
  const result = filterOutOldMessages(messages, oldest)
  expect(result.length).toBe(4)
})

test('With very recent timelimit, only parentmessages and their threads are included', () => {
  const oldest = '1643625219.000000'
  const result = filterOutOldMessages(messages, oldest)
  expect(result.length).toBe(2)
  expect(result[0].thread_array.length).toBeGreaterThan(0)
  expect(result[1].thread_array.length).toBeGreaterThan(0)
})

test('Parentmessages that are older than timelimit include message that this is the case', () =>{
  const oldest = '1643625219.000000'
  const result = filterOutOldMessages(messages, oldest)
  expect(result[0].text.includes(':parent-message-outside-of-timelimit')).toBe(true)
  expect(result[1].text.includes(':parent-message-outside-of-timelimit')).toBe(true)
})

test('Messages without parents and within timeline are listed without any change', () => {
  const oldest = '1642934019.000000'
  const result = filterOutOldMessages(messages, oldest)
  expect(result.length).toBe(3)
  expect(result[1].text.includes(':parent-message-outside-of-timelimit')).toBe(false)
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