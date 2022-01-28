const { WebClient, LogLevel } = require('@slack/web-api')
//const res = require('express/lib/response')
const {
  GetHumanMessagesFromSlack,
  GetWordsFromMessages,
  GetRealNamesFromSlack,
  GetThreads,
  GetTimeStamps,
} = require('./filterSlackResponse')

async function importHistory(channelId, slackToken, res) {
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
    const words = GetWordsFromMessages(messages)
    const threads = GetThreads(messages)
    const threadTimestamps = GetTimeStamps(threads)

    try {
      const threadsWithReplies = []
      for (let i=0; i < threadTimestamps.length; i++) {
        let threadWithReplies = await client.conversations.replies({
          channel: channelId,
          ts: threadTimestamps[i],
        })
        threadsWithReplies.push(threadWithReplies.messages)
      }
    } catch (error) {
      //
    }
    res.json({ messages: messagesWithNames, words: words })
  } catch (error) {
    res.send(error.data.error)
  }
}

module.exports = importHistory
