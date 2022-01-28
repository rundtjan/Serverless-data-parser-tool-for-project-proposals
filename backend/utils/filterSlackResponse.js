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
  messages.forEach((message) => {
    let words = message.text.split(' ')
    words = words.filter(notAnEmoji)
    words.forEach((e) => result.push(e))
  })
  return result
}

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
