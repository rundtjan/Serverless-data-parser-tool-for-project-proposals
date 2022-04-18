/**
 * A function which parses the info from the request sent by a Slack messageshortcut.
 * @param {*} event the event that was received as a parameter to the lambda 
 * @returns a parsed object containing the needed info from the message shortcut request
 */

module.exports = (event) => {
  let data = event.body
  let buff = Buffer.from(data, 'base64')
  event.body = buff.toString()
  let decoded = decodeURIComponent(event.body)
  let json = JSON.parse(decoded.split('=')[1])
  console.log('entire json from shortcut ', json)
  const shortcut = json.callback_id
  const channelId = json.channel.id 
  const thread_ts = json.message.thread_ts
  const message_ts = json.message_ts
  const response_url = json.response_url
  let text = ''
  json.message.text.split('+').forEach(element => text += `${element} `)
  text = text.substring(0, 50) + '...'
  return { thread_ts, message_ts, channelId, text, response_url, shortcut }
}