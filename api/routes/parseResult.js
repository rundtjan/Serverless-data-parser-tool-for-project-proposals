const slackController = require('../controllers/slackController')
const parseReqBody = require('../utils/parseReqBody')
const { parseTimestamp } = require('../utils/parseSlackTimestamp')

module.exports = async function (event) {
    console.log('Receiving post from Parsa front for parsing.');

    let data = event.body
    let buff = new Buffer(data, 'base64');
    event.body = buff.toString('ascii');
    event = parseReqBody(event)
    console.log('eventbody', event.body)

    const args = {channel: event.body.channel, user: event.body.user, oldest: event.body.oldest}
    if (!args.oldest) args.oldest = parseTimestamp(Date.now() * 1000, event.body.hours)
    console.log('args', args)

    try {
        const response = await slackController.slackMessages(args)
        return response
    } catch (error) {
        return error.error
    }
}
