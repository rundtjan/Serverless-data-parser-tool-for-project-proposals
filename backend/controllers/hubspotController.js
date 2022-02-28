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
  // TODO: CREATE CUSTOM DEAL PROPERTIES IN HUBSPOT DEALS WEBSITE?
  // TODO: ID REQUIRED ( How to find? )
  try {
    const result = await hubspot.updateDeal(obj)
    if (result) res.send(result)
    else res.status(500).send('No result : updateDeal')
  } catch (error) {
    res.status(500).send(`${error.message}`)
  }
}

const createDeal = async (res, obj) => {
  // Simple "placeholder". This works and deal is created to hubspot account but its mostly blank.
  // TODO: Create custom properties for hubspot deals?
  // TODO: Ask about possible hubspot test environment.
  //const SimplePublicObjectInput = { dealname: 'NoNameForThisDeal', properties: obj }
  //console.log('obj', obj)
  const price = String(obj.Price || '').replace(/[^0-9,]+/g,'')
  //console.log(price)
  const SimplePublicObjectInput = {
    properties: {dealname: `Deal ${obj.Customer || 'no client'}`,  amount: `${Number(price) || 0 }`}
  }
  //console.log(SimplePublicObjectInput)
  try {
    const result = await hubspot.createDeal(SimplePublicObjectInput)
    if (result.id) res.send('success')
    else res.send('error')
  } catch (e) {
    console.log(e)
    res.send('error')
  }
}
const getOwners = async () => {
  // For testing, remove later.
  const email = undefined
  const after = undefined
  const limit = 100
  const archived = false

  try {
    const apiResponse = await hubspot.crm.owners.ownersApi.getPage(email, after, limit, archived)
    console.log(JSON.stringify(apiResponse.body, null, 2))
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}
module.exports = { getAllDeals, updateDeal, createDeal, getAllContacts, getOwners }
