const parseSlackTimestamp = require('../../utils/parseSlackTimestamp')

test('The correct timestamp is returned', () => {
  const now = Date.now() * 1000
  const hours = 24
  var correctStamp = (now - hours * 60 * 60 * 1000000).toString()
  correctStamp = correctStamp.substring(0, 10) + '.' + correctStamp.substring(10, 16)
  const timestamp = parseSlackTimestamp(now, hours)
  expect(timestamp).toBe(correctStamp)
})