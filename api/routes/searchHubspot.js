const hubspotController = require('../controllers/hubspotController')

module.exports = async function (event) {
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