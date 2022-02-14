const { WebClient, LogLevel } = require('@slack/web-api')

const slackToken = process.env.SLACK_TOKEN

const slackClient = new WebClient(slackToken, {
  logLevel: LogLevel.DEBUG,
})

module.exports = { slackClient }