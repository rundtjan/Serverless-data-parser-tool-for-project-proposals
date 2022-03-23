const slackController = require('./parsaLogic/controllers/slackController')

module.exports = async function () {
    console.log('Getting channels.');

    try {
        const response = await slackController.slackChannels()
        return response
    } catch (error) {
        return error.error
    }
}
