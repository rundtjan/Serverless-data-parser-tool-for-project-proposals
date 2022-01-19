// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
const res = require("express/lib/response");

async function importHistory(channelId, slackToken, res){
  
  const client = new WebClient(slackToken, {
      logLevel: LogLevel.DEBUG
  });
  
  try {
    const result = await client.conversations.history({
      channel: channelId
    });
    res.json(result);
  }
  catch (error) {
    res.send(error.data.error)
    //res.send("error");
  }
  }

module.exports = importHistory;
