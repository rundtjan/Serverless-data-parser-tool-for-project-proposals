/**
 * Parses a timestamp to same format as in Slack.
 * @param {Number} now Timestamp at the moment.
 * @param {Number} hours how old messages do we want as in 24h or 72h.
 * @returns a timestamp in the same format as in Slack.
 */
function parseTimestamp(now, hours) {
  if (hours){
    var timestamp = (now - hours * 60 * 60 * 1000000).toString()
    return timestamp.substring(0,10) + '.' + timestamp.substring(10)
  }
  return false
}

/**
 * Parses a string Slack timestamp containing a dot to integer as in millions of seconds.
 * @param {String} slackTimestamp in the format 1234567.898765 as in millions of seconds and with a dot.
 * @returns Time stamp as an integer without the dot.
 */
function parseTimestampFromSlackTs(slackTimestamp){
  return parseInt(slackTimestamp.replace('.', ''))
}

module.exports = { parseTimestamp, parseTimestampFromSlackTs }
