const slashCommand = require('./slashCommand')
const parseResult = require('./parseResult')
const parseReqBody = require('./parsaLogic/utils/parseReqBody')

exports.handler = async (event) => {
    if (event.queryStringParameters && event.queryStringParameters.route){
        switch(event.queryStringParameters.route) {
            case 'slashCommand':
                const response = await slashCommand(event)
                return response
            case 'parseResult':
                const data = await parseResult(event)
                return data
            default:
                return 'Fix your route.'
        }
    }
}