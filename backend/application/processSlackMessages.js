const {
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  AddThreadToParent,
  filterOutOldMessages,
  filterMessagesByUser,
} = require('./filterSlackResponse')

// TODO : Create parent function that does api calls all at once and remove args drilling or do this in controller
// TODO : remove Unnecessary api calls, info is already somewhere.
// TODO : Throw errors to controller that sends error response?
async function addThreadsToMessages(res, slack, args) {
  const {channelId, oldest, user, messages} = args
  const threads = GetThreads(messages)
  const threadTimestamps = GetTimeStamps(threads)
  try {
    var parentIndex = 0
    for (let i = 0; i < threadTimestamps.length; i++) {
      const query_args = { channel: channelId, ts: threadTimestamps[i] }
      if (oldest) query_args.oldest = oldest
      let threadWithReplies = await slack.getThreadMessages(query_args)
      parentIndex = AddThreadToParent(threadWithReplies, messages, parentIndex)
    }
    const resultObj = await addNamesToMessages(res, slack, messages, oldest, user)
    return resultObj
  } catch (error) {
    console.error(error)
  }
}

async function addNamesToMessages(res, slack, messages, oldest, user) {
  var members = {}
  const users = await slack.getUsers()
  users.forEach((elem) => (members[elem.id] = elem.name))
  GetRealNamesFromSlack(messages, members)
  messages
    .filter((elem) => elem.thread_array.length > 0)
    .forEach((elem) => GetRealNamesFromSlack(elem.thread_array, members))

  const result = applyFilters(res, messages, oldest, user)  
  return result
}

function applyFilters(res, messages, oldest, user) {
  if (oldest) messages = filterOutOldMessages(messages, oldest)
  if (user) messages = filterMessagesByUser(messages, user)
  const words = GetWordsFromMessages(messages)
  return { messages: messages, words: words }
}

module.exports = { addThreadsToMessages }
