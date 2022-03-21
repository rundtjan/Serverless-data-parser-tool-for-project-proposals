const slashCommand = require('./slashCommand')
const parseResult = require('./parseResult')
const getChannels = require('./getChannels')
const sendToHubspot = require('./sendToHubspot')

exports.handler = async (event) => {

    var response

    if (event.queryStringParameters && event.queryStringParameters.route){
        switch(event.queryStringParameters.route) {
            case 'getChannels':
                response = await getChannels()
                break
            case 'slashCommand':
                response = await slashCommand(event)
                break
            case 'parseResult':
                response = await parseResult(event)
                break
            case 'sendToHubspot':
                response = await sendToHubspot(event)
                break
            default:
                response = 'Check your route'
        }
    }

    return response
}