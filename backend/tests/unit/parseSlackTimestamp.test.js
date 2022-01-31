const { parseTimestamp } = require('../../utils/parseSlackTimestamp')

test('The correct timestamp is returned', () => {
  const now = Date.now() * 1000
  const hours = 24
  var correctStamp = now - hours * 60 * 60 * 1000000
  const timestamp = parseTimestamp(now, hours)
  expect(timestamp).toBe(correctStamp)
})