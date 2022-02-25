const hubspotService = require('../services/hubspotService')
const hubspotClient = require('../services/hubspotClient')
const hubspot = hubspotService(hubspotClient)

const getAllDeals = async (res) => {
  try {
    const result = await hubspot.getAllDeals()
    console.log('AAAAAA ', result)
    if (result) res.send(result)
    else res.status(500).send('No result : getAllDeals')
  } catch (error) {
    res.sendStatus(501)
    //res.status(500).send(`${error.message}`)
  }
}

const getAllContacts = async (res) => {
  try {
    const result = await hubspot.getAllContacts()
    if (result) res.send(result)
    else res.status(500).send('No result : getAllContacts')
  } catch (error) {
    res.status(500).send(`${error.message}`)
  }
}

const updateDeal = async () => {
  //const hubspot = require('@hubspot/api-client')

  const hubspotClient = new hubspot.Client({ apiKey: `${process.env.HUBSPOT_APIKEY}` })

  const limit = 10
  const after = undefined
  const properties = undefined
  const propertiesWithHistory = undefined
  const associations = undefined
  const archived = false

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived
    )
    console.log(JSON.stringify(apiResponse.body, null, 2))
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

const createDeal = async (res, obj) => {
  //const hubspot = require('@hubspot/api-client')

  //const hubspotClient = new hubspot.Client({ apiKey: `${process.env.HUBSPOT_APIKEY}` })
  // Create properties from param obj.
  console.log(obj)
  const properties = {
    amount: '1500.00',
    closedate: '2019-12-07T16:50:06.678Z',
    dealname: 'Custom data integrations',
    hubspot_owner_id: `${process.env.HUBSPOT_OWNER_ID}`,
  }
  const SimplePublicObjectInput = { properties }

  try {    
    const result = await hubspot.createDeal(SimplePublicObjectInput)
    // const apiResponse = await hubspotClient.crm.deals.basicApi.create(SimplePublicObjectInput)
    // console.log(JSON.stringify(apiResponse.body, null, 2))
    // res.send(JSON.stringify(apiResponse.body))
    res.json(result)
  } catch (e) {
    // e.message === 'HTTP request failed'
    //   ? console.error(JSON.stringify(e.response, null, 2))
    //   : console.error(e)
    console.log(e)
  }
}
const getOwners = async () => {
  //const hubspot = require('@hubspot/api-client')

  const hubspotClient = new hubspot.Client({ apiKey: `${process.env.HUBSPOT_APIKEY}` })

  const email = undefined
  const after = undefined
  const limit = 100
  const archived = false

  try {
    const apiResponse = await hubspotClient.crm.owners.ownersApi.getPage(
      email,
      after,
      limit,
      archived
    )
    console.log(JSON.stringify(apiResponse.body, null, 2))
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}
module.exports = { getAllDeals, updateDeal, createDeal, getAllContacts, getOwners }
