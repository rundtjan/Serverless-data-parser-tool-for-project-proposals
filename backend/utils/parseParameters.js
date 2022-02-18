const { getChannels } = require('../services/slackService.js')
const { parseTimestamp } = require('./parseSlackTimestamp.js')

const parameterIsUsername = (param) => {
  return param.charAt(0) === '@'
}

const parameterIsHours = (param) => {
  return !isNaN(parseInt(param))
}

const parameterIsValidChannel = (param) => {
  const validChannels = getChannels()
  for (const channel in validChannels) {
    if (param === channel) {
      return true
    }
  }
  return false
}

const parseParameters = (parameters) => {
  //expects a post with data in format, all parameters are optional: {"channel": CHANNEL_NAME, "user": USER_NAME, "hours": HOW_MANY_HOURS_BACK}
  if (parameters.length === 0) {
    const channel = 'general'
    const args = { channel }
    return args
  }
  if (parameters.length === 1) {
    if (parameterIsHours(parameters[0])) {
      const hours = parameters[0]
      const oldest = parseTimestamp(Date.now() * 1000, hours)
      const args = { oldest }
      return args
    }
    if (parameterIsUsername(parameters[0])) {
      const user = parameters[0]
      const args = { user }
      return args
    }
    if (parameterIsValidChannel(parameters[0])) {
      const channel = parameters[0]
      const args = { channel }
      return args
    }
  }
  /**
   * @TODO: Fix to work with 2 parameters
   */
}

module.exports = {parseParameters}