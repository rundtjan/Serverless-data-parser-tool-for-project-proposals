
const GetHumanMessagesFromSlack = (messages) => {    
    const result = messages.filter(obj => {        
        return obj.hasOwnProperty('client_msg_id')
    })
    return result
}

const GetWordsFromMessages = (messages) => {
    const result = []
    messages.forEach(message => {
        let words = message.text.split(" ")
        words = words.filter(notAnEmoji)
        words.forEach(e => result.push(e))
    })
    return result
}

const notAnEmoji = word => word.charAt(0) !== ":"

module.exports = { GetHumanMessagesFromSlack, GetWordsFromMessages }
