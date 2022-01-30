const { WebClient, LogLevel } = require('@slack/web-api')

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

async function importHistory(channelId, slackToken, res, oldest, user) {
  var members = {}

  const client = new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG,
  })

  try {
    const result = await client.conversations.history({
      channel: channelId,
    })
    const users = await client.users.list({})
    users.members.forEach((elem) => (members[elem.id] = elem.real_name))
    const messages = GetHumanMessagesFromSlack(result.messages)
    const messagesWithNames = GetRealNamesFromSlack(messages, members)    
    const threads = GetThreads(messages)
    const threadTimestamps = GetTimeStamps(threads)

    try {
      for (let i=0; i < threadTimestamps.length; i++) {
        let threadWithReplies = await client.conversations.replies({
          channel: channelId,
          ts: threadTimestamps[i],
        })
        AddThreadToParent(threadWithReplies.messages, messagesWithNames)
      }
    } catch (error) {
      //
    }
    if (oldest) filterOutOldMessages(messagesWithNames, oldest)
    if (user) filterMessagesByUser(messagesWithNames, user)
    const words = GetWordsFromMessages(messagesWithNames)
    res.json({ messages: messagesWithNames, words: words })
  } catch (error) {
    res.send(error.data.error)
  }
}

module.exports = importHistory