const {
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  AddThreadToParent,
  filterOutOldMessages,
  filterMessagesByUser,
} = require('./filterSlackResponse')

async function addThreadsToMessages(
  res,
  slack,
  channelId,
  messages,
  oldest,
  user
) {
  const threads = GetThreads(messages)
  const threadTimestamps = GetTimeStamps(threads)
  try {
    var parentIndex = 0
    for (let i = 0; i < threadTimestamps.length; i++) {
      var args = { channel: channelId, ts: threadTimestamps[i] }
      if (oldest) args.oldest = oldest
      let threadWithReplies = await slack.getThreadMessages(args)
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
