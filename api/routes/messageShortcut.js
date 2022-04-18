
const axios = require('axios')
const parseShortcutPayload = require('../utils/parseShortcutPayload')

/**
 * A function that takes care of requests to 'POST route=messageShortcut' containing
 * a request to parse a certain thread.
 * @param {*} event the event object passed as a parameter to the lambda-function, contains info
 * on the thread to parse.
 * @returns an object that informs Slack of that the messageshortcut request was received.
 * Before returning this object, however, it posts an answer to Slack using Axios.
 */
const messageShortcut = async function(event) {
  event = parseShortcutPayload(event)
  if(event.shortcut==='message_shortcut') {
    await axios.post(event.response_url, {'text': `You parsed a message starting: "${event.text}". See the result at: https://main.dtatk8xusyguu.amplifyapp.com/type=message&ts=${event.message_ts}&channel=${event.channelId}`})
    return {statusCode: 200}
  }
  if(event.shortcut==='thread_shortcut') {
    await axios.post(event.response_url, {'text': `You parsed a thread starting: "${event.text}". See the result at: https://main.dtatk8xusyguu.amplifyapp.com/type=thread&ts=${event.thread_ts}&channel=${event.channelId}`})
    return {statusCode: 200}
  }
  console.log('message shortcut ', event)
}
module.exports = { messageShortcut }



//Test url for localhost message shortcut
//localhost:3000/type=message&ts=${event.message_ts}&channel=${event.channelId}`