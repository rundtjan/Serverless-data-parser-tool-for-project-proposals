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

const searchDeals = async (queryString) => {
  try {
    const result = await hubspot.searchDeals(queryString)
    return result
    // if (result) res.send(result)
    // else res.status(500).send('No result : getAllDeals')
  } catch (error) {
    return {error: error.message}
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


const updateDeal = async (res, id, properties) => {
  const dealObject = {
    id: id,
    properties: {
      properties
    }
  }
  try {
    const result = await hubspot.updateDeal(dealObject)
    if (result) res.send(result)
    else res.status(500).send('No result : updateDeal')
  } catch (error) {
    res.status(500).send(`${error.message}`)
  }
}

const createDeal = async (obj) => {
  // create new deal based on json sent from UI
  // only customer & price are used for testing new deal creation.
  // No custom properties space available atm.
  // TODO: use existing custom properties to store our data? 
  var description = ''
  Object.keys(obj).forEach((key) => {
    if (key !== 'Customer' && key !== 'Price') description += `${key}: ${obj[key]}, `
  })
  description = description.substring(0,description.length-2)
  try {
    const price = String(obj.Price || '').replace(/[^0-9,]+/g, '')
    //console.log(price)
    const SimplePublicObjectInput = {
      properties: {
        dealname: `Deal ${obj.Customer || 'no client'}`,
        amount: `${Number(price) || 0}`,
        description: description,
      },
    }

    const result = await hubspot.createDeal(SimplePublicObjectInput)
    return result
  } catch (e) {
    console.log(e)
    return 'error'
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
module.exports = { getAllDeals, updateDeal, createDeal, getAllContacts, getOwners, searchDeals, updateDeal }
