const { filterOutOldMessages } = require('../../utils/filterSlackResponse.js')
var messages = require('./dataForTimefilterTest.json')

test('All tests for timefilter need to be renewed', () => {
  const oldest = '1642847619.000000'
  const result = filterOutOldMessages(messages, oldest)
  expect(result.length).toBeDefined()
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