const getThreads = require('../../utils/filterSlackResponse').GetThreads
const {threadTestMessages} = require('./constants')

test('Threads are returned correctly from all messages', () => {
  const threads = getThreads(threadTestMessages)
  expect(threads.length).toBe(3)      
})

test('Thread_array is not empty or null for threads', () => {  
  const threads = getThreads(threadTestMessages)
  expect(threads.length).toBe(3)
  expect(threads[0].thread_array.length).not.toBeNull()
  expect(threads[1].thread_array.length).not.toBeNull()
  expect(threads[2].thread_array.length).not.toBeNull()
})