const { parseTimestampFromSlackTs } = require('../utils/parseSlackTimestamp')
const { co_Set, fillerWords } = require('../utils/languageConstants')
const { assignCategoryToWord } =  require('../utils/assignCategoryToWord')

/**
 * Filters messages if it is sent by a human user (has client_msg_id-feld).
 * @param {Object} messages a lsit of Slack message objects.
 * @returns a list of Slack messages which are sent by a human user.
 */
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
 * Adds an array for threads to message where the threads of the message are stored.
 * @param {object} message A slack message object to which the array field is added.
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


/**
 * Adds messages which are from a thread to it's corresponding parent message.
 * @param {Object} thread parent message to which the messages are joined.
 * @param {Object} messages messages (thread replies) which are joined to their parent messages.
 * @param {number} parentIndex index of parent message in the Slack messages list.
 * @returns parent index, the messages's position in the message list.
 */
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

/**
 * Makes each word from every message a word object.
 * Does also different checks along the way.
 * @param {Object} messages list of Slack message objects.
 * @returns list of custom made word objects which are later used.
 */
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

/**
 * Parses given words. Checks if is an emoji or contains special characters and so on.
 * Assign also to a category.
 * @param {Object} words list of words gotten from Slack messages.
 * @returns List of parsed words.
 */
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

/**
 * Looks for all the threaded messages in given messages.
 * @param {Object} messages List of Slack message objects.
 * @returns List of Slack messages which are responses to threads.
 */
const AddThreadMessages = (messages) => {
  let result = []
  messages.forEach((message) => {
    if (message.thread_array && message.thread_array.length > 0) {
      result = result.concat(message.thread_array)
    }
  })
  return result
}

/**
 * Creates an word object which is used when words are parsed and shown.
 * @param {string} word Word from which the object is created.
 * @param {Object} message The message where the word belongs to.
 * @param {string} category Which category does the word belong to e.g technology, customer, so on..
 * @returns a custom word object.
 */
const Create_Word_Obj = (word, message, category) => {
  return {
    'word': word,
    'message_ids': [message.client_msg_id],
    'count': 1,
    'important': false,
    'category': category
  } 
}

/**
 * Removes special characters from the word.
 * @param {string} word which is stripped from special characters.
 * @returns the same word but without the special characters.
 */
const RemoveSpecialCharacters = (word) => word.replace(/[^\w\såäö£$€.,]/gi, '')

/**
 * Removes trailing dots from the word.
 * @param {string} word which is stripped from the trailing dots.
 * @returns the same word but without trailing dots.
 */
const RemoveTrailingDots = (word) => word.replace(/\.+$/g, '')

/**
 * Removes trailing commas from the word.
 * @param {string} word which is stripped from the trailing commas.
 * @returns the same word but without the trailing commas.
 */
const RemoveTrailingCommas = (word) => word.replace(/,+$/g, '')

/**
 * Maps for every message real users and real names.
 * @param {Object} messages List of Slack message objects.
 * @param {Object} members List of Slack user objects which are valid workspace users.
 */
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

/**
 * Filters messages which are in the desired time window.
 * @param {Object} messages Messages which are filtered.
 * @param {number} oldest hours which defines the oldest message e.g. 24 gives all messages which are not older than 24 hours.
 * @returns List of Slack messages which are inside the desired time span.
 */
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

/**
 * Filters messages which are sent by the given user.
 * @param {Object} messages list of Slack messages.
 * @param {String} user who's messages are wanted.
 * @returns list of Slack messages which are sent by the given user.
 */
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

/**
 * Adds the company entity type to a word. Currently works for cases where the company name is a single word.
 * e.g. string "Asiakas Oy" is parsed as "Asiakas" and "Oy", but "Oy" is recognized as a finnish company entity type so it is concatenated to the preceding word.
 * At some point this should be looked and refactored so that more company entity types are taken to noticed e.g. "Gmbh" and so on.
 * Also at some point should be refactored so that the company named would be recognized if it had multiple words e.g. "Kauppisen maan siirto firma Oy".
 * @param {Object} words list of words which contain a company name and company entity types.
 * @returns words which have company entity typed merged into them.
 */
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
