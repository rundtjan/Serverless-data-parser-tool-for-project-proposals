const getThreads = require('../../application/filterSlackResponse').GetThreads
const {threadTestMessages} = require('./testMessages')

test('Threads are returned correctly from all messages', () => {
  const threads = getThreads(threadTestMessages)
  expect(threads.length).toBe(3)      
})

test('Thread_array is not empty or null for threads', () => {  
  const threads = getThreads(threadTestMessages)
  expect(threads.length).toBe(3)
  for (let i=0; i < threads.length; i++) {
    expect(threads[i].thread_array).not.toBeNull()
  }
})