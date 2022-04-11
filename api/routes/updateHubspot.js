const { CollectionResponseWithTotalSimplePublicObjectForwardPaging } = require('@hubspot/api-client/lib/codegen/crm/companies')
const hubspotController = require('../controllers/hubspotController')
const hubspotUrl = process.env.HUBSPOT_URL
const { replyToChannel, replyToThread } = require('../controllers/slackController')
const parseSlackNotification = require('../utils/parseSlackNotification')
/**
 * A function that takes care of requests of type 'POST route=updateDeals' containing the
 * parameters to use as simplePublicObjectInput and dealId.
 * @param {*} event an object passed as parameters to the lambda, contains
 * dealId and properties to be updated.
 * @returns the response from Hubspot or an error.
 */
module.exports = async function (event) {
  let data = event.body
  let buff = Buffer.from(data, 'base64')
  const sendJson = JSON.parse(buff.toString('utf8'))
  try {
    const result = await hubspotController.updateDeal(sendJson.properties, sendJson.dealId)
    const customer = sendJson.properties.Customer
    if (result.id) {
      if (sendJson.responseTarget){
        if (sendJson.responseTarget.ts){
          ({ channel_id, ts } = sendJson.responseTarget) // eslint-disable-line
          await replyToThread(channel_id, ts, parseSlackNotification(customer, 'updated', 'thread', `${hubspotUrl}${result.id}`, result.properties.dealname)) // eslint-disable-line
        } else {
          ({ channel_id } = sendJson.responseTarget) // eslint-disable-line
          await replyToChannel(channel_id, parseSlackNotification(customer, 'updated', 'channel', `${hubspotUrl}${result.id}`, result.properties.dealname)) // eslint-disable-line
        }
      }
      return { status: 'success', id: result.id, message: {text: 'Deal Successfully Updated', link:`${hubspotUrl}${result.id}/`}}
    } else return { status: 'error', id: undefined, message: `Deal Update Failed : ${result}` }
  } catch (error) {
    console.log(error)
    return { status: 'error', id: undefined, message: `Deal Update Failed : ${error.message}` }
  }
}