const hubspotController = require('../controllers/hubspotController')
const { replyToChannel, replyToThread } = require('../controllers/slackController')
const parseSlackNotification = require('../utils/parseSlackNotification')
const hubspotUrl = process.env.HUBSPOT_URL

/**
 * This function is inserted between the actual handlerfunction and the 
 * calling index-function, to enable testing with injected dependencies (mock functions).
 * @param {*} event 
 * @returns see below
 */
const sendToHubspot = async (event) => {
  return await sendToHubspotHandler(event, hubspotController, replyToChannel, replyToThread, parseSlackNotification, hubspotUrl)
}

/**
 * A function that takes care of requests of type 'POST route=sendToHubspot' that contains
 * info on a deal that should be created in Hubspot.
 * @param {*} event the object passed as a parameter to the lambda, contains a json
 * to send to Hubspot
 * @param {*} hubspotController 
 * @param {*} replyToChannel 
 * @param {*} replyToThread 
 * @param {*} parseSlackNotification 
 * @param {*} hubspotUrl 
 * @returns an object for showing the result in the Parsa-frontend
 */
const sendToHubspotHandler = async (event, hubspotController, replyToChannel, replyToThread, parseSlackNotification, hubspotUrl) => {
  console.log(event.body)
  let data = event.body
  let buff = Buffer.from(data, 'base64')
  const sendJson = JSON.parse(buff.toString('utf-8'))

  try {
    console.log(sendJson.deal)
    const customer = sendJson.deal.Customer
    const result = await hubspotController.createDeal(sendJson.deal)
    if (result.id) {
      if (sendJson.responseTarget){
        if (sendJson.responseTarget.ts){
          ({ channel_id, ts } = sendJson.responseTarget) // eslint-disable-line
          await replyToThread(channel_id, ts, parseSlackNotification(customer, 'created', 'thread', `${hubspotUrl}${result.id}`)) // eslint-disable-line
        } else {
          ({ channel_id } = sendJson.responseTarget) // eslint-disable-line
          await replyToChannel(channel_id, parseSlackNotification(customer, 'created', 'channel', `${hubspotUrl}${result.id}`)) // eslint-disable-line
        }
      }
      return { status: 'success', id: result.id,  message: {text: `Deal Created with ID: ${result.id}`, link:`${hubspotUrl}${result.id}/`}}
    }
    return { status: 'error', id: undefined, message: `Deal Update Failed : ${result}` }
  } catch (error) {
    console.log(error)
    return { status: 'error', id: undefined, message: `Deal Update Failed : ${error.message}` }
  }
}

module.exports = { sendToHubspot, sendToHubspotHandler }
