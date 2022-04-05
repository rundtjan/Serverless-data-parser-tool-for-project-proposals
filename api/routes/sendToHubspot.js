const hubspotController = require('../controllers/hubspotController')
const axios = require('axios')

/**
 * A function that takes care of requests of type 'POST route=sendToHubspot' that contains
 * info on a deal that should be created in Hubspot.
 * @param {*} event the object passed as a parameter to the lambda, contains a json
 * to send to Hubspot
 * @returns a string - either 'success' or 'error'
 */
module.exports = async function (event) {
  console.log(event.body)
  let data = event.body
  let buff = Buffer.from(data, 'base64')
  const sendJson = JSON.parse(buff.toString('utf-8'))
  const baseUrlSlashCommand = 'https://hooks.slack.com/commands/'
  const hubspotUrl = 'https://app.hubspot.com/contacts/8059424/deal/'

  try {
    const result = await hubspotController.createDeal(sendJson.deal)
    if (result.id) {
      if (sendJson.responseUrl) {
        await axios.post(baseUrlSlashCommand+sendJson.responseUrl, {'text': `You have created a new deal in Hubspot at ${hubspotUrl}${result.id}`})
      }
      return 'success'
    }
    return 'error'
  } catch (error) {
    console.log(error)
    return 'error'
  }
}
