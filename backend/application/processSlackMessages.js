const {
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  GetHumanMessagesFromSlack,
  AddThreadToParent,
  filterOutOldMessages,
  filterMessagesByUser,
} = require('./filterSlackResponse')

const categories = require('./categories.json')

// TODO : Create parent function that does api calls all at once and remove args drilling or do this in controller
// TODO : remove Unnecessary api calls, info is already somewhere.
// TODO : Throw errors to controller that sends error response?

async function processSlackMessages(slack, args) {
  // channel, oldest, user are contained in args
  const { channel } = args
  try {
    const channels = await slack.getChannels()

    var channelId = channels.channels.filter((obj) => {
      return obj.name == channel || obj.id == channel
    })[0].id
    const result = await slack.getChannelMessages(channelId)
    let messages = result.reverse()

    messages = GetHumanMessagesFromSlack(result)
    args.messages = messages
    args.channelId = channelId

    const resultObj = await addThreadsToMessages(slack, args)

    return resultObj
  } catch (error) {
    throw new Error(error.message)
  }
}

async function addThreadsToMessages(slack, args) {
  const { channelId, oldest, user, messages } = args
  const threads = GetThreads(messages)
  const threadTimestamps = GetTimeStamps(threads)
  const promises = []
  var parentIndex = 0
  console.time('apicalls')
  try {
    // Send all api queries at once.
    for (let i = 0; i < threadTimestamps.length; i++) {
      const query_args = { channel: channelId, ts: threadTimestamps[i] }
      if (oldest) query_args.oldest = oldest
      let apiResponse = slack.getThreadMessages(query_args)
      promises.push(apiResponse)
    }
    // Wait for all api queries to complete.
    const threadsWithResponses = await Promise.all(promises)
    // Then process threads.
    for (let i = 0; i < threadsWithResponses.length; i++) {
      parentIndex = AddThreadToParent(threadsWithResponses[i], messages, parentIndex)
    }
    console.timeEnd('apicalls')
    const resultObj = await addNamesToMessages(slack, messages, oldest, user)
    return resultObj
  } catch (error) {
    console.error(error)
  }
}

async function addNamesToMessages(slack, messages, oldest, user) {
  var members = {}
  const users = await slack.getUsers()
  users.forEach(
    (elem) => (members[elem.id] = { username: elem.username, real_name: elem.real_name })
  )
  GetRealNamesFromSlack(messages, members)
  messages
    .filter((elem) => elem.thread_array.length > 0)
    .forEach((elem) => GetRealNamesFromSlack(elem.thread_array, members))

  const result = applyFilters(messages, oldest, user)
  return result
}

function applyFilters(messages, oldest, user) {
  if (oldest) messages = filterOutOldMessages(messages, oldest)
  if (user) messages = filterMessagesByUser(messages, user)
  const words = GetWordsFromMessages(messages)
  return { messages: messages, words: words, categories: categories }
}

module.exports = { processSlackMessages }
