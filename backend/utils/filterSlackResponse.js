const GetHumanMessagesFromSlack = (messages) => {
  const result = messages.filter((obj) => {
    return Object.prototype.hasOwnProperty.call(obj, 'client_msg_id')
  })
  return result.reverse()
}

const messageIsThreaded = (message) => Object.prototype.hasOwnProperty.call(message, 'thread_ts')

const GetTimeStamps = (messages) => {
  const result = messages.map(message => {
    if (messageIsThreaded(message)) {
      return message.ts
    }
  })
  return result
}

const addThreadArrayToEachMessage = (message) => {
  message.thread_array = []
}

const GetThreads = (messages) => {
  const result = messages.filter((message) => {
    addThreadArrayToEachMessage(message)
    return messageIsThreaded(message)
  })
  return result
}

const AddThreadToParent = (thread, messages) => {
  messages.forEach(elem => elem.client_msg_id == thread[0].client_msg_id ? elem.thread_array = thread.slice(1) : elem )
}

const GetWordsFromMessages = (messages) => {
  const result = []
  const temp_word_obj = {}
  
  messages.forEach((message) => {
    let words = message.text.split(' ')
    words = words.filter(notAnEmoji)
    words.forEach((word) => {
      word = RemoveSpecialCharacters(word)
      word = word.toLowerCase() 
      word in temp_word_obj ? 
        (temp_word_obj[word]['count'] += 1, temp_word_obj[word]['message_ids'].push(message.client_msg_id)) :
        temp_word_obj[word] = Create_Word_Obj(word, message)          
    })
  })
  
  Object.keys(temp_word_obj).forEach( key => {
    result.push(temp_word_obj[key])
  })
  
  result.sort((a, b) => b.count - a.count)
  return result
}

const Create_Word_Obj = (word, message) => {
  return {
    'word': word,
    'message_ids': [message.client_msg_id],
    'count': 1
  } 
}

const RemoveSpecialCharacters = (word) => word.replace(/[^\w\såäö£$€]/gi, '')

const GetRealNamesFromSlack = (messages, members) => {
  messages.forEach((elem) => (elem.real_name = members[elem.user]))
  return messages
}

const notAnEmoji = (word) => word.charAt(0) !== ':'

module.exports = {
  GetHumanMessagesFromSlack,
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  AddThreadToParent
}
