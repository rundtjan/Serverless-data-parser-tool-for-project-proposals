const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })

const getAllByUser = async (res, id) => {
  try {
    const messages = await slack.findAllByUser(id)
    res.send(messages)
  } catch (error) {
    res.send(error)
  }
}

const getSlackUsers = async (res) => {
  try {
    const users = await slack.getUsers()
    res.send(users)
  } catch (error) {
    res.send(error)
  }
}

const getChannels = async (res) => {
  try {
    const channels = await slack.getChannelNames()
    res.send(channels)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getSlackUsers,
  getAllByUser,
  getChannels,
}
