const axios = require('axios')
const parseShortcutPayload = require('../utils/parseShortcutPayload')
const { replyToThread } = require('../controllers/slackController')

/**
 * A function that takes care of requests to 'POST route=messageShortcut' containing
 * a request to parse a certain thread.
 * @param {*} event the event object passed as a parameter to the lambda-function, contains info
 * on the thread to parse.
 * @returns an object that informs Slack of that the messageshortcut request was received.
 * Before returning this object, however, it posts an answer to Slack using Axios.
 */

module.exports = async function(event){
  event = parseShortcutPayload(event)
  console.log('message shortcut', event)
  await replyToThread('C033WM9HGAZ', '1649145689.480209', 'Testing sending reply to thread.')
  await axios.post(event.response_url, {'text': `You parsed a thread starting: "${event.text}". See the result at: https://main.dtatk8xusyguu.amplifyapp.com/type=thread&ts=${event.thread_ts}&channel=${event.channelId}`})
  return {statusCode: 200}
}