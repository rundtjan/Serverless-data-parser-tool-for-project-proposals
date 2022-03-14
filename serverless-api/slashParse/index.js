const { parseParameters } = require('../parsaLogic/utils/parseParameters.js')
const parseReqBody = require('../parsaLogic/utils/parseReqBody')
const parseSlashResponse = require('../parsaLogic/utils/parseSlashResponse')

module.exports = async function (context, req) {
    context.log('Received a slash parse command.');

    req = parseReqBody(req)

    if(!req.body.channel_name) { 
        context.res = {body: "Info missing in your request."}
        context.done()
    }

    const params = req.body.text.split('+').filter(Boolean)

    if (params.length <= 3) {
      context.log('params length is correct')
      const parsedParams = await parseParameters(params, req.body.channel_name)
      var queryParams = ''
      Object.keys(parsedParams).forEach(key => queryParams += `${key}=${parsedParams[key]}&`)
      const responseMessage = `Please find your parsed data at https://black-bush-0639c4403.1.azurestaticapps.net/${queryParams.substring(0,queryParams.length-1)}`
      parseSlashResponse(responseMessage)
    } else {
      const responseMessage = 'There were too many parameters in your request'
      parseSlashResponse(responseMessage)
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: resJson,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}