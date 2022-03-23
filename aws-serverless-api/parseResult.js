const slackController = require('./parsaLogic/controllers/slackController')
const parseReqBody = require('./parsaLogic/utils/parseReqBody')

module.exports = async function (event) {
    console.log('Receiving post from Parsa front for parsing.');

    let data = event.body
    let buff = new Buffer(data, 'base64');
    event.body = buff.toString('ascii');
    event = parseReqBody(event)

    const args = {channel: event.body.channel, user: event.body.user, oldest: event.body.oldest}

    try {
        const response = await slackController.slackMessages(args)
        return response
    } catch (error) {
        return error.error
    }
}
