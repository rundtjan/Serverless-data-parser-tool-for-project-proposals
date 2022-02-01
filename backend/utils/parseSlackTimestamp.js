function parseTimestamp(now, hours) {
  if (hours){
    var timestamp = (now - hours * 60 * 60 * 1000000).toString()
    return timestamp.substring(0,10) + '.' + timestamp.substring(10)
  }
  return false
}

function parseTimestampFromSlackTs(slackTimestamp){
  return parseInt(slackTimestamp.replace('.', ''))
}

module.exports = { parseTimestamp, parseTimestampFromSlackTs }
