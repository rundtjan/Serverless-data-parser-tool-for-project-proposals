const { WebClient, LogLevel } = require("@slack/web-api");
const res = require("express/lib/response");
const {GetHumanMessagesFromSlack, GetWordsFromMessages} = require("./filterSlackResponse")

async function importHistory(channelId, slackToken, res){
  
  const client = new WebClient(slackToken, {
      logLevel: LogLevel.DEBUG
  });
  
  try {
    const result = await client.conversations.history({
      channel: channelId
    });

    const messages = GetHumanMessagesFromSlack(result.messages)
    const words = GetWordsFromMessages(messages)
    res.json(words);
  }
  catch (error) {
    res.send(error.data.error)
  }
  }

module.exports = importHistory;
