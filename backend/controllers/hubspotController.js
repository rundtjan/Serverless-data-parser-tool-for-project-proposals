const hubspotService = require('../services/hubspotService')
const hubspotClient = require('../services/hubspotClient')
const hubspot = hubspotService(hubspotClient)

const getAllDeals = async (res) => {
  try {
    const result = await hubspot.getAllDeals()
    if (result) res.send(result)
    else res.status(500).send('No result : getAllDeals')
  } catch (error) {
    res.status(500).send(error.message)
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

const updateDeal = async (res, obj) => {
  // NOT IMPLEMENTED YET
  // TODO: CREATE NEEDED PROPERTIES FROM OBJ
  // TODO: ID REQUIRED
  try {    
    const result = await hubspot.updateDeal(obj)
    if (result) res.send(result)
    else res.status(500).send('No result : updateDeal')
  } catch (error) {
    res.status(500).send(`${error.message}`)
  }
}

const createDeal = async (res, obj) => {
  const SimplePublicObjectInput = { obj }
  try {    
    const result = await hubspot.createDeal(SimplePublicObjectInput)
    console.log(result)
    //res.json(result)
    if(result.id) res.send('success')
    else res.send('error')
  } catch (e) {
    console.log(e)
    res.send('error')
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
