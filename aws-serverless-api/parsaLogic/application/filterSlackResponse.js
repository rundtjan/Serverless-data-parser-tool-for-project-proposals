const { parseTimestampFromSlackTs } = require('../utils/parseSlackTimestamp')
const { co_Set, fillerWords } = require('../utils/languageConstants')
const { assignCategoryToWord } =  require('../utils/assignCategoryToWord')


const GetHumanMessagesFromSlack = (messages) => {
  const result = messages.filter((obj) => {
    return Object.prototype.hasOwnProperty.call(obj, 'client_msg_id')
  })
  return result
}

/**
 * Checks if the message is a thread. Slack API says that threads have a 'thread_ts'-field.
 * @param {object} message a slack message object containing text, user, etc.
 * @returns True if message is a thread and False otherwise
 */
const messageIsThreaded = (message) =>
  Object.prototype.hasOwnProperty.call(message, 'thread_ts')

/**
 * Gets a list of timestamps of every threaded message.
 * @param {object} messages a list of messages from Slack.
 * @returns List of timestamps from every threaded message.
 */
const GetTimeStamps = (messages) => {
  const result = messages.map((message) => {
    if (messageIsThreaded(message)) {
      return message.ts
    }
  })
  return result
}

/**
 * Adds an array for threads to message.
 * @param {object} message A slack message object to which the array field is added
 */
const addThreadArrayToEachMessage = (message) => {
  message.thread_array = []
}

/**
 * Gets messages which are threads.
 * @param {object} messages An array of slack message objects
 * @returns List of Slack message objects which are threads.
 */
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
      const category = assignCategoryToWord(word)
      word in temp_word_obj
        ? ((temp_word_obj[word]['count'] += 1),
        temp_word_obj[word]['message_ids'].push(message.client_msg_id))
        : (temp_word_obj[word] = Create_Word_Obj(word, message, category))
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
    word = word.toLowerCase()
    word = RemoveTrailingDots(word)
    word = RemoveTrailingCommas(word)
    // If no category is assigned, specialCharacters is removed.
    const category = assignCategoryToWord(word)
    if(category === '') {
      word = RemoveSpecialCharacters(word)
    }  
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

const Create_Word_Obj = (word, message, category) => {
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
  messages.forEach((elem) => {
    elem.real_name = members[elem.user].real_name
    elem.username = members[elem.user].username
  })
}

/**
 * Checks if a word is an emoji.
 * @param {object} word a word object to be checked. Emojis start with ":".
 * @returns true if word is not an emoji and false otherwise.
 */
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
  if (user.includes('@')) user = user.substring(1)
  const resMessages = []
  for (var i = 0; i < messages.length; i++) {
    var message = messages[i]
    if (message.thread_array.length > 0) {
      message.thread_array = message.thread_array.filter(
        (elem) => elem.real_name == user || elem.username == user
      )
    }
    if (message.real_name == user || message.username == user) {
      resMessages.push(message)
    }
    if (!(message.real_name == user || message.username == user) && message.thread_array.length > 0) {
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
