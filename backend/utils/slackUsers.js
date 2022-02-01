const { WebClient, LogLevel } = require('@slack/web-api')

const users = []

async function slackUsers(slackToken, res){

  const client = new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG,
  })

  try {
    const result = await client.users.list({
    })

    result.members.filter(elem => !elem.is_bot).forEach(elem => users.push({'id': elem.id, 'name': elem.real_name}))

    res.send(users)
  } catch (error){
    res.send(error.data.error)
  }

}

module.exports = slackUsers