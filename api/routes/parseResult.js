const slackController = require('../controllers/slackController')
const parseReqBody = require('../utils/parseReqBody')
const { parseTimestamp } = require('../utils/parseSlackTimestamp')


/**
 * This function is inserted between the actual handlerfunction and the 
 * calling index-function, to enable testing with injected dependencies (mock functions).
 * @param {*} event 
 * @returns see below
 */
const parseResult = async (event) => {
  console.log('parseresult ', event)
  return await parseResultHandler(event, slackController, parseReqBody, parseTimestamp)
}

/**
 * A function that takes care of requests of type 'POST routes=parseResult' containing a
 * request to parse data with certain parameters.
 * @param {*} event an object passed as a parameter to the lambda-function, containing
 * info on the data to be parsed and sent as response
 * @param {*} slackController injected dependency
 * @param {*} parseReqBody injected dependency
 * @param {*} parseTimestamp injected dependency
 * @returns either a response object or an error-message
 */
const parseResultHandler = async (event, slackController, parseReqBody, parseTimestamp) => {
  console.log('Receiving post from Parsa front for parsing.')
  console.log('')
  let data = event.body
  let buff = Buffer.from(data, 'base64')
  event.body = buff.toString('ascii')
  event = parseReqBody(event)

  if (event.body.type && event.body.type === 'thread') {
    try {
      const response = await slackController.getAllMessagesFromSingleThread(event.body)
      return response
    } catch (error) {
      return error.error
    }
  } else if (event.body.type && event.body.type === 'message') {
    try {
      const response = await slackController.getOneMessage(event.body)
      return response
    } catch (error) {
      return error.error
    }
    
  } else {
    const args = {channel: event.body.channel, user: event.body.user, oldest: event.body.oldest}
    if (!args.oldest) args.oldest = parseTimestamp(Date.now() * 1000, event.body.hours)
    
    try {
      const response = await slackController.slackMessages(args)
      response.query = {
        channel: event.body.channel ? event.body.channel : undefined,
        user: event.body.user ? event.body.user : undefined,
        oldest: event.body.oldest ? event.body.oldest : undefined,
      }
      return response
    } catch (error) {
      return error.error
    }
  }
}

module.exports = { parseResult, parseResultHandler }
