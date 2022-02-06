const { WebClient, LogLevel } = require('@slack/web-api')

async function slackChannels(slackToken, res){

  const channels = []

  const client = new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG,
  })

  try {
    const result = await client.conversations.list({})
    console.log(result)
    result.channels.filter(elem => elem.is_channel).forEach(elem => channels.push(elem.name))

    res.send(channels)
  } catch (error){
    res.send(error.data.error)
  }

}

module.exports = slackChannels