const slackController = require('../parsaLogic/controllers/slackController')
const parseReqBody = require('../parsaLogic/utils/parseReqBody')

module.exports = async function (context, req) {
    context.log('Receiving post from Parsa front for parsing.');

    req = parseReqBody(req)

    const args = {channel: req.body.channel, user: req.body.user, oldest: req.body.user}

    try {
        const response = await slackController.slackMessages(context, args)
        context.res = {body: response}
    } catch (error) {
        const result = error.error
    }
}
