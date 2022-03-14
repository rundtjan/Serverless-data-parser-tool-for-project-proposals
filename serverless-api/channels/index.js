const slackController = require('../parsaLogic/controllers/slackController.js')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for channels.');

    try {
        const responseMessage = await slackController.slackChannels()
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    } catch (error){
        context.log(error)
    }

}