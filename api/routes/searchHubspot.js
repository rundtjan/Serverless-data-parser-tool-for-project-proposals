const hubspotController = require('../controllers/hubspotController')


/**
 * This function is inserted between the actual handlerfunction and the 
 * calling index-function, to enable testing with injected dependencies (mock functions).
 * @param {*} event 
 * @returns see below
 */
const searchHubspot = async (event) => {
  return await searchHubspotHandler(event, hubspotController)
}

/**
 * A function that takes care of requests of type 'POST route=searchDeals' containing the
 * parameter to use as a query-string.
 * @param {*} event an object passed as parameters to the lambda, contains
 * info on the query to use as a search parameter.
 * @param {*} hubspotController injected dependency
 * @returns the response from Hubspot or an error.
 */
const searchHubspotHandler = async (event, hubspotController) => {
  console.log(event)
  console.log(event.body)
  let data = event.body
  let buff = Buffer.from(data.toString('ascii'), 'base64')
  const reqObj = JSON.parse(buff)
  console.log(reqObj)

  try {
    const result = await hubspotController.searchDeals(reqObj.queryString)
    return result
  } catch (error) {
    console.log(error)
    return {error: error.message}
  }
}

module.exports = { searchHubspot, searchHubspotHandler }