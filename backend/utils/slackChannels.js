const { WebClient, LogLevel } = require('@slack/web-api')

const channels = []

async function slackChannels(slackToken, res){

    const client = new WebClient(slackToken, {
        logLevel: LogLevel.DEBUG,
      })

    try {
        const result = await client.conversations.list({
        })

        result.channels.filter(elem => elem.is_channel).forEach(elem => channels.push({"id": elem.id, "name": elem.name}));

        res.send(channels)
    } catch (error){
        res.send(error.data.error)
    }

}

module.exports = slackChannels