/**
 * A function which parses a response object to be sent to Slack as the response to a slashcommand
 * for parsing messages.
 * @param {*} parsedParams the parsed parameters to include in the response
 * @param {*} frontUrl the front url where Parsa can be found
 * @returns the complete response-object
 */
const response = (parsedParams, frontUrl, responseUrl, channel_id) => {
  var queryParams = 'responseUrl=' + responseUrl + '&'
  Object.keys(parsedParams).forEach(key => queryParams += `${key}=${parsedParams[key]}&`)
  queryParams += `channel_id=${channel_id}`
  const resObj = {
    statusCode: 200,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': '*Please view your parsed messages at:*'
          }
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': `${frontUrl}${queryParams}`
          }
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': '*You used the parameters:*'
          }
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': `Channel = ${parsedParams.channel}, user = ${parsedParams.user || 'not chosen'} and timelimit (hrs) = ${parsedParams.hours || 'not chosen'}.`
          }
        }
      ]
    }),
  }
  return resObj

}




module.exports = response
