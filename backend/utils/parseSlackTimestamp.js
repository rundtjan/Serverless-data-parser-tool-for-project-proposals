function parseSlackTimestamp(now, hours) {
  if (hours){
    const timestamp = (now - hours * 60 * 60 * 1000000).toString()
    return timestamp.substring(0, 10) + '.' + timestamp.substring(10, 16)
  }
  return null
}

module.exports = parseSlackTimestamp
