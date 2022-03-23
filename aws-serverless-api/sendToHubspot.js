const hubspotController = require('./parsaLogic/controllers/hubspotController')

module.exports = async function (event) {
    console.log(event.body)
    let data = event.body
    let buff = new Buffer(data, 'base64')
    const sendJson = JSON.parse(buff.toString('ascii'))
    console.log(sendJson.Customer)

    try {
        const response = await hubspotController.createDeal(sendJson)
        return 'success'
    } catch (error) {
        console.log(error)
        return 'error'
    }
}
