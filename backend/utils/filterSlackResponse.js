const { parseTimestampFromSlackTs } = require('./parseSlackTimestamp')

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

const AddThreadToParent = (thread, messages, parentIndex) => {
  for (var i = parentIndex; i < messages.length; i++){
    if (messages[i].client_msg_id == thread[0].client_msg_id){
      messages[i].thread_array = thread.slice(1)
      parentIndex = i
      break
    }
  }
  return parentIndex //this is used for time-optimization
}

const GetWordsFromMessages = (messages) => {
  const result = []
  const temp_word_obj = {}
  messages = messages.concat(AddThreadMessages(messages))
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

const AddThreadMessages = (messages) => {
  let result = []
  messages.forEach(message => {
    if(message.thread_array && message.thread_array.length > 0){      
      result = result.concat(message.thread_array)
    }
  })
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
}

const notAnEmoji = (word) => word.charAt(0) !== ':'

const filterOutOldMessages = (messages, oldest) => {
  const resMessages = []
  for (var i = 0; i < messages.length; i++){
    var message = messages[i]
    if (parseTimestampFromSlackTs(message.ts) >= parseTimestampFromSlackTs(oldest)){
      resMessages.push(message)
    } else {
      if (message.thread_array.length > 0){
        message.text += ' :parent-message-outside-of-timelimit'
        resMessages.push(message)
      }
    }
  }
  return resMessages
}

const filterMessagesByUser = (messages, user) => {// eslint-disable-line
  const resMessages = []
  for (var i = 0; i < messages.length; i++){
    var message = messages[i]
    if (message.thread_array.length > 0){
      const newThread = []
      for (var j = 0; j < message.thread_array.length; j++){
        if (message.thread_array[j].real_name == user){
          newThread.push(message.thread_array[j])
        }
      }
      message.thread_array = newThread.slice()
    }
    if (message.real_name == user){
      resMessages.push(message)
    }
    if (message.real_name != user && message.thread_array.length > 0){
      message.text += ' :parent-of-a-thread-with-messages-by-' + user.replace(' ', '-')
      resMessages.push(message)
    }
  }
  return resMessages
}

module.exports = {
  GetHumanMessagesFromSlack,
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  AddThreadToParent,
  filterOutOldMessages,
  filterMessagesByUser
}
