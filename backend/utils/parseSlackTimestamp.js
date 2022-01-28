function parseSlackTimestamp(hours) {
  if (hours){
    const now = Date.now() * 1000 //microseconds
    const timestamp = (now - hours * 60 * 60 * 1000000).toString()
    return timestamp.substring(0, 10) + '.' + timestamp.substring(10, 16)
  }
  return '1000000000.000000'
}

module.exports = parseSlackTimestamp
