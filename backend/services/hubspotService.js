const hubspotService = ({ hubspotClient }) => {
  
  const getAllDeals = async () => {
    const limit = 10
    const after = undefined
    const properties = undefined
    const propertiesWithHistory = undefined
    const associations = undefined
    const archived = false
    let result = undefined
    try {
      console.log('Hello from getAllDeals')
      const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(
        limit,
        after,
        properties,
        propertiesWithHistory,
        associations,
        archived
      )
      if (apiResponse.results) result = apiResponse.results
      //console.log('getAllDeals results : ',JSON.stringify(apiResponse.results, null, 2))
    } catch (e) {
      throw new Error(`Error in getAll: ${e.message}`)
    }
    return result
  }

  const getAllContacts = async () => {    
    const allContacts = await hubspotClient.crm.contacts.getAll()
    return allContacts
  }

  const createDeal = async (dealObject) => {
    try {
      const response = await hubspotClient.crm.deals.basicApi.create(dealObject)
      return response
    } catch (e){
      throw new Error(`Error in createDeal: ${e.message}`)
    }
  }

  return Object.freeze({
    getAllDeals,
    getAllContacts,
    createDeal,
  })
}
module.exports = hubspotService
