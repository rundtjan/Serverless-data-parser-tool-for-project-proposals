function parseTimestamp(now, hours) {
  if (hours){
    return now - hours * 60 * 60 * 1000000
  }
  return false
}

function parseTimestampFromSlackTs(slackTimestamp){
  return parseInt(slackTimestamp.replace('.', ''))
}

module.exports = { parseTimestamp, parseTimestampFromSlackTs }
