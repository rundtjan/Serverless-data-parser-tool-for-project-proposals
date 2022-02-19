const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const { parseTimestamp } = require('./parseSlackTimestamp.js')

function isNumeric(val) {
  return /^-?\d+$/.test(val)
}

const parameterIsUsername = (param) => {
  return param.charAt(0) === '@'
}

const parameterIsHours = (param) => {
  return isNumeric(param)
}

const parameterIsValidChannel = async (param) => {
  const validChannels = await slack.getChannels()

  for (const channel in validChannels) {
    if (param === channel) {
      return true
    }
  }
  return false
}

const parseParameters = (parameters, source_channel) => {
  //expects a post with data in format, all parameters are optional: {"channel": CHANNEL_NAME, "user": USER_NAME, "hours": HOW_MANY_HOURS_BACK}
  if (parameters.length === 0) {
    const channel = source_channel
    const user = null
    const oldest = parseTimestamp(Date.now() * 1000, null)
    const args = { channel, user, oldest }
    return args
  }
  if (parameters.length === 1) {
    
    if (parameterIsHours(parameters[0])) {
      const hours = parameters[0]
      const oldest = parseTimestamp(Date.now() * 1000, hours)
      const channel = source_channel
      const user = null
      const args = { channel, user, oldest }
      return args
    }
    else if (parameterIsUsername(parameters[0])) {
      const user = parameters[0]
      const oldest = parseTimestamp(Date.now() * 1000, null)
      const channel = source_channel
      const args = { channel, user, oldest }
      return args
    }
    else if (parameterIsValidChannel(parameters[0])) {
      
      const channel = parameters[0]
      const user = null
      const oldest = parseTimestamp(Date.now() * 1000, null)
      const args = { channel, user, oldest }
      return args
    }
  }
  if (parameters.length === 3) {
    const channel = parameters[0] || 'general'
    // username wil be in format @user.name for example @aleksi.suuronen and needs to be implemented
    const user = parameters[1]
    const hours = parameters[2]
    const oldest = parseTimestamp(Date.now() * 1000, hours)
    const args = { channel, user, oldest }
    return args
  }
  /**
   * @TODO: Fix to work with 2 parameters
   */
}

module.exports = { parseParameters }
