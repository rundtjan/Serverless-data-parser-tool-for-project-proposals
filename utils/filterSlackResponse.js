
const GetHumanMessagesFromSlack = (messages) => {    
    const result = messages.filter(obj => {        
        return obj.hasOwnProperty('client_msg_id')
    })
    return result
}

const GetWordsFromMessages = (messages) => {
    const result = []
    messages.forEach(message => {
        words = message.text.split(" ")
        words = removeEmojis(words)
        words.forEach(e => result.push(e))
    })
    return result
}

const removeEmojis = words => {    
    const result = words.filter(word => {
        return word.charAt(0) !== ":"
    })
    return result
}

module.exports = { GetHumanMessagesFromSlack, GetWordsFromMessages }
