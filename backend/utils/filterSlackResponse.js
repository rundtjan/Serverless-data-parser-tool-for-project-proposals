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

const AddThreadToParent = (thread, messages) => {
  messages.forEach(elem => elem.client_msg_id == thread[0].client_msg_id ? elem.thread_array = thread.slice(1) : elem )
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
  //return messages
}

const notAnEmoji = (word) => word.charAt(0) !== ':'

const filterOutOldMessages = (messages, oldest) => {// eslint-disable-line
  const newMessages = []
  for (var i = 0; i < messages.length; i++){
    var message = messages[i]
    var thArrln = message.thread_array.length
    if (thArrln > 0){
      if (parseTimestampFromSlackTs(message.thread_array[thArrln-1].ts) < oldest){//the whole thread and parent can be ignored
        continue
      } else if (parseTimestampFromSlackTs(message.thread_array[0].ts) < oldest){//only parts of the thread should be included
        var newThread = []
        for (var j = message.thread_array.length-1; j >= 0; j--){
          if (parseTimestampFromSlackTs(message.thread_array[j].ts) >= oldest){//message should be included in new thread
            newThread.push(message.thread_array[j])
          } else {//we have reached too old messages in the thread
            break
          }
        }
        newThread.reverse()
        message.thread_array = newThread.slice()
      }
    }
    if (parseTimestampFromSlackTs(message.ts) < oldest && message.thread_array.length > 0){//parent is too old but there's relevant messages in the thread
      message.text = ':The-start-of-this-thread-is-outside-of-timelimit'
      message.real_name = 'Comment by bot'
      message.user = 'xxxxx'
      newMessages.push(message)
    } else if (parseTimestampFromSlackTs(message.ts) >= oldest){//message is ok to push to array
      newMessages.push(message)
    }
  }
  //console.log(newMessages)
  return newMessages
}

const filterMessagesByUser = (messages, user) => {// eslint-disable-line
  console.log('This should start filtering by user')
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
