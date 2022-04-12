
const { parseParameters } = require('../utils/parseParameters')
const parseReqBody = require('../utils/parseReqBody')
const frontUrl = 'https://main.dtatk8xusyguu.amplifyapp.com/'
const helpResponse = require('../utils/helpResponse')
const parseResponse = require('../utils/parseResponse')


/**
 * The handler for the request of type 'POST route=slashCommand' from Slack.
 * @param {*} event the request eventbody.
 * @param {*} parseReqBody dependency injected for parsing the request body
 * @param {*} frontUrl the frontUrl to return in the answer to Slack
 * @param {*} helpResponse dependency injected, parses a help-response
 * @param {*} parseResponse dependency injected, parses a regular response
 * @returns an response object with a response to Slack.
 */
const slashHandler = async (event, parseReqBody, frontUrl, helpResponse, parseResponse) => {
  let data = event.body
  let buff = Buffer.from(data, 'base64')
  event.body = buff.toString('utf-8')
  event = parseReqBody(event)

  if(!event.body.channel_name) { 
    return {status: 200, body: 'Info missing in your request.'}
  }

  const params = event.body.text.split('+').filter(Boolean)

  if (params.includes('help')) return helpResponse

  try {
    const parsedParams = await parseParameters(params, event.body.channel_name)
    return parseResponse(parsedParams, frontUrl, event.body.channel_id)
  } catch (error) {
    console.log('error ', error)
    return error.message
  }
}

/**
 * A simple caller function, that calls the slash command handler. 
 * This solution is implemented in order to enable dependency injection for more efficient testing.
 * @param {*} event 
 * @returns the result of the handler
 */
 const slashCommand = async (event) => {
  return await slashHandler(event, parseReqBody, frontUrl, helpResponse, parseResponse)
}

module.exports = { slashCommand, slashHandler }
