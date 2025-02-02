const hubspot = require('@hubspot/api-client')

const hubspotApiKey = process.env.HUBSPOT_APIKEY
const hubspotClient = new hubspot.Client({ 'apiKey': hubspotApiKey })

module.exports = { hubspotClient }
