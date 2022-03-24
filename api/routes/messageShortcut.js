const axios = require('axios')
const parseShortcutPayload = require('../utils/parseShortcutPayload')

module.exports = async function(event){
    console.log('message shortcut', event)

    let data = event.body
    let buff = Buffer.from(data, 'base64');
    event.body = buff.toString();
    event = parseShortcutPayload(event)
    console.log(event)
    await axios.post(event.response_url, {'text': `You have requested parsing for a thread starting with: ${event.text}...`})
    await axios.post(event.response_url, {'text': `Please visit Parsa at: https://latest.d39h3tn7qml2m3.amplifyapp.com/type=thread&ts=${event.thread_ts}&channel=${event.channel}`})
    return
}