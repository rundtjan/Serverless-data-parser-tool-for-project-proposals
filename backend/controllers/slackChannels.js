
async function slackChannels(res, slack){
  try {
    const result = await slack.getChannelNames()
    res.send(result)
  } catch (error){
    res.send(error.data.error)
  }

}

module.exports = slackChannels