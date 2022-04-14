const { parseTimestamp } = require('./parseSlackTimestamp.js')

/**
 * Regex which is used to determine is a parameter coming from the Slash command a number of hours as in "24"
 * @param {A value to be checked if is a numeric value} val 
 * @returns True if is numeric as in is a valid number of hours
 */
function isNumeric(val) {
  return /^-?\d+$/.test(val)
}

/**
 * Checks if parameter is username.
 * @param {Username coming from Slack in the form of "@user.name"} param 
 * @returns True if parameter is username.
 */
const parameterIsUsername = (param) => {
  return param.includes('%40')
}

/**
 * Checks if parameter is an amount of hours (a number).
 * @param {Some value coming from the Slack channel} param 
 * @returns True if the parameter is a number.
 */
const parameterIsHours = (param) => {
  return isNumeric(param)
}

/**
 * Function which takes the Slash command parameters sent from the Slack workspace.
 * Checks the amount and type of parameters e.g "24" as a number, @user.name as a user and so on.
 * All parameters are optional: {"channel": CHANNEL_NAME, "user": USER_NAME, "hours": HOW_MANY_HOURS_BACK}
 * @param {An object of parameters, expected 0, 1 or 2} parameters 
 * @param {Channel where the command is sent e.g "general" or "random"} source_channel 
 * @returns arguments depending on the parameters which are passed then forward.
 */
const parseParameters = async (parameters, source_channel) => {
  if (parameters.length === 0) {
    const channel = source_channel
    const user = null
    const oldest = parseTimestamp(Date.now() * 1000, null)
    const args = { channel, user, oldest, hours: null}
    return args
  } else if (parameters.length > 2) {
    throw new Error('You seem to have entered too many parameters. Please try again. Allowed parameters (both optional): [user][hours]')
  } else {
    const args = { channel: source_channel, user: null, oldest: null, hours: null}
    parameters.forEach(element => {
      if (parameterIsUsername(element)){
        if (!args.user) { args.user = element.replace('%40', '@'); return }
        else throw new Error('You seem to have entered two user-parameters, while only one is allowed. Please try again or type /parsa help for instructions.')
      }
      else if (parameterIsHours(element)){
        if (!args.oldest) { args.oldest = parseTimestamp(Date.now() * 1000, element), args.hours = element; return }
        else throw new Error('You seem to have entered two hour-parameters, while only one is allowed. Please try again or type /parsa help for instructions')
      }
      else throw new Error(`There is a problem with the parameter: '${element}'. Please try again or type /parsa help for instructions.`)
    })
    return args
  }
}

module.exports = {
  parseParameters,
  isNumeric,
  parameterIsHours,
  parameterIsUsername
}
