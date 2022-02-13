const { parseTimestampFromSlackTs } = require('../utils/parseSlackTimestamp')
const { co_Set, fillerWords } = require('../utils/utilityConstants')
const { assignCategoryToWord } =  require('../utils/assignCategoryToWord')


const GetHumanMessagesFromSlack = (messages) => {
  const result = messages.filter((obj) => {
    return Object.prototype.hasOwnProperty.call(obj, 'client_msg_id')
  })
  return result
}

const messageIsThreaded = (message) =>
  Object.prototype.hasOwnProperty.call(message, 'thread_ts')

const GetTimeStamps = (messages) => {
  const result = messages.map((message) => {
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
  for (var i = parentIndex; i < messages.length; i++) {
    if (messages[i].client_msg_id == thread[0].client_msg_id) {
      messages[i].thread_array = thread.slice(1)
      parentIndex = i
      break
    }
  }
  return parentIndex
}

const GetWordsFromMessages = (messages) => {
  const result = []
  const temp_word_obj = {}

  messages = messages.concat(AddThreadMessages(messages))
  messages.forEach((message) => {
    const words = message.text.split(' ')
    let parsedWords = ParseWords(words)
    parsedWords = mergeCompanyEntityType(parsedWords)
    parsedWords = parsedWords.filter(word => !fillerWords.has(word))
    parsedWords = parsedWords.filter(Boolean)
    parsedWords.forEach((word) => {
      word in temp_word_obj
        ? ((temp_word_obj[word]['count'] += 1),
        temp_word_obj[word]['message_ids'].push(message.client_msg_id))
        : (temp_word_obj[word] = Create_Word_Obj(word, message))
    })
  })

  Object.keys(temp_word_obj).forEach((key) => {
    result.push(temp_word_obj[key])
  })

  result.sort((a, b) => b.count - a.count)
  return result
}

const ParseWords = (words) => {
  let parsedWords = words.filter(notAnEmoji)
  parsedWords = parsedWords.map((word) => {
    word = RemoveSpecialCharacters(word)
    word = RemoveTrailingDots(word)
    word = RemoveTrailingCommas(word)
    word = word.toLowerCase()
    return word
  })
  return parsedWords
}

const AddThreadMessages = (messages) => {
  let result = []
  messages.forEach((message) => {
    if (message.thread_array && message.thread_array.length > 0) {
      result = result.concat(message.thread_array)
    }
  })
  return result
}

const Create_Word_Obj = (word, message) => {
  const category = assignCategoryToWord(word)
  return {
    'word': word,
    'message_ids': [message.client_msg_id],
    'count': 1,
    'important': false,
    'category': category
  } 
}

const RemoveSpecialCharacters = (word) => word.replace(/[^\w\såäö£$€.,]/gi, '')
const RemoveTrailingDots = (word) => word.replace(/\.+$/g, '')
const RemoveTrailingCommas = (word) => word.replace(/,+$/g, '')

const GetRealNamesFromSlack = (messages, members) => {
  messages.forEach((elem) => (elem.real_name = members[elem.user]))
}

const notAnEmoji = (word) => word.charAt(0) !== ':'

const filterOutOldMessages = (messages, oldest) => {
  const resMessages = []
  for (var i = 0; i < messages.length; i++) {
    var message = messages[i]
    if (
      parseTimestampFromSlackTs(message.ts) >= parseTimestampFromSlackTs(oldest)
    ) {
      resMessages.push(message)
    } else {
      if (message.thread_array.length > 0) {
        message.text += ' :parent-message-outside-of-timelimit'
        resMessages.push(message)
      }
    }
  }
  return resMessages
}

const filterMessagesByUser = (messages, user) => {
  const resMessages = []
  for (var i = 0; i < messages.length; i++) {
    var message = messages[i]
    if (message.thread_array.length > 0) {
      message.thread_array = message.thread_array.filter(
        (elem) => elem.real_name == user
      )
    }
    if (message.real_name == user) {
      resMessages.push(message)
    }
    if (message.real_name != user && message.thread_array.length > 0) {
      message.text +=
        ' :parent-of-a-thread-with-messages-by-' + user.replace(' ', '-')
      resMessages.push(message)
    }
  }
  return resMessages
}

const mergeCompanyEntityType = (words) => {
  if (words.length <= 1) return words
  for (let i = 0; i < words.length; i++) {
    if (co_Set.has(words[i])) {
      if (words[i] === 'oy' && i + 2 < words.length && words[i + 2] === 'ab') {
        words[i] = words[i]
          .concat(` ${words[i + 1]}`)
          .concat(` ${words[i + 2]}`)
        words[i + 1] = ''
        words[i + 2] = ''
        continue
      }
      if (i > 0 && !co_Set.has(words[i-1])) {
        words[i - 1] = words[i - 1].concat(` ${words[i]}`)
        words[i] = ''
      }
    }
  }
  const filteredWords = words.filter(Boolean)
  return filteredWords
}

module.exports = {
  GetHumanMessagesFromSlack,
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  AddThreadToParent,
  filterOutOldMessages,
  filterMessagesByUser,
}
