

async function slackUsers(res, slack) {
  try {
    const result = await slack.getUsers()    
    res.send(result)
  } catch (error) {
    res.send(error.data.error)
  }
}

async function slackGetAllByUser(res, slack, id) {
  try {
    const messages = await slack.findAllByUser(id)
    res.send(messages)
  } catch (error) {
    res.send(error)
  }
}

module.exports = { slackUsers, slackGetAllByUser }
