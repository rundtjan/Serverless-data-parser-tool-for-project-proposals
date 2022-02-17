const { getChannels } = require('../services/slackService.js')

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
      const args = { hours }
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
   * @TODO: FIX and think with 2 parameters
  else if (parameters.length === 2) {
    const channel = parameters[0] || 'general'
    const user =  parameters[1]
    //@TODO: params[1]or the username will be in the format @user.name for example @aleksi.suuronen and needs to be implemented
    const args = { channel, user }
    saveQuery(response, args)
  }*/
  /*
  //Assumes every parameter comes nicely as wanted and described
  const channel = parameters[0] || 'general'
  // username wil be in format @user.name for example @aleksi.suuronen and needs to be implemented
  const user = parameters[1]
  const hours = parameters[2]
  const oldest = parseTimestamp(Date.now() * 1000, hours)
  const args = {channel, user, oldest }
  */
}

module.exports = {parseParameters}