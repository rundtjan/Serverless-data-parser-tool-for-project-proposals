const slashCommand = require('./routes/slashCommand')
const parseResult = require('./routes/parseResult')
const getChannels = require('./routes/getChannels')
const sendToHubspot = require('./routes/sendToHubspot')

exports.handler = async (event) => {
    console.log(event)
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