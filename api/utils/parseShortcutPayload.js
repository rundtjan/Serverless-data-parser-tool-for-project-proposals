const parseReqBody = require('./parseReqBody')

module.exports = (event) => {
    const thread_ts = event.body.split('thread_ts%22%3A%22')[1].split('%')[0]
    event = parseReqBody(event)
    const payloadArr = event.body.payload.split('%22%2C%22')
    payload = {}
    payloadArr.forEach(element => {
        arr = element.split('%22%3A%22')
        if (arr.length > 1) payload[arr[0]] = decodeURI(arr[1])
    });
    const channel = payload.name.split('"')[0]
    let text = ''
    payload.text.split('+').forEach(element => text += `${element} `)
    text = text.substring(0, 50) + '...'
    urlArr = payload.response_url.split('\\%2F')
    const response_url = `https://hooks.slack.com/app/${urlArr[4]}/${urlArr[5]}/${urlArr[6]}`    
    return { thread_ts, channel, text, response_url }
}