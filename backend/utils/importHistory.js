const { WebClient, LogLevel } = require('@slack/web-api')
//const res = require('express/lib/response')
const {
  GetHumanMessagesFromSlack,
  GetWordsFromMessages,
  GetRealNamesFromSlack,
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
    res.json({ messages: messagesWithNames, words: words })
  } catch (error) {
    res.send(error.data.error)
  }
}

module.exports = importHistory
