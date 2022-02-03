require('dotenv').config()
const { WebClient, LogLevel } = require('@slack/web-api')
const slackToken = process.env.SLACK_TOKEN

const {
  GetHumanMessagesFromSlack,
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
  AddThreadToParent,
  filterOutOldMessages,
  filterMessagesByUser
} = require('./filterSlackResponse')

const client = new WebClient(slackToken, {
  logLevel: LogLevel.DEBUG,
})

async function importHistory(res, channel, oldest, user) {

  try {
    const channels = await client.conversations.list({})
    var channelId = channels.channels.filter(obj => {
      return obj.name == channel || obj.id == channel
    })[0].id
    const result = await client.conversations.history({
      channel: channelId,
    })

    var messages = result.messages.reverse()
    
    messages = GetHumanMessagesFromSlack(result.messages)

    addThreadsToMessages(res, channelId, messages, oldest, user)

  } catch (error) {
    if (error){
      console.error(error)
      res.send('Error in getting data.')
    }
  }
}

async function addThreadsToMessages(res, channelId, messages, oldest, user){
  const threads = GetThreads(messages)
  const threadTimestamps = GetTimeStamps(threads)
  try {
    var parentIndex = 0
    for (let i=0; i < threadTimestamps.length; i++) {
      var args = {channel: channelId, ts: threadTimestamps[i]}
      if (oldest) args.oldest = oldest
      let threadWithReplies = await client.conversations.replies(args)
      parentIndex = AddThreadToParent(threadWithReplies.messages, messages, parentIndex)
    }
    addNamesToMessages(res, messages, oldest, user)
  } catch (error) {
    console.error(error)
  }
}

async function addNamesToMessages(res, messages, oldest, user){
  var members = {}
  const users = await client.users.list({})
  users.members.forEach((elem) => (members[elem.id] = elem.real_name))
  GetRealNamesFromSlack(messages, members)
  messages.filter(elem => elem.thread_array.length > 0).forEach(elem => GetRealNamesFromSlack(elem.thread_array, members))

  applyFilters(res, messages, oldest, user)
}

function applyFilters(res, messages, oldest, user){
  if (oldest) messages = filterOutOldMessages(messages, oldest)
  if (user) messages = filterMessagesByUser(messages, user)
  const words = GetWordsFromMessages(messages)
  res.json({ messages: messages, words: words })
}

module.exports = importHistory