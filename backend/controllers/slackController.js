const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })

const { importHistory, parseTimestamp } = require('../application/importHistory')

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

const getChannelHistory = async (res, channel) => {
  try {
    const result = await importHistory(res, channel)
    res.json(result)
  } catch (error) {
    res.send(error)
  }
}

const getChannelHistoryWithParameters = async (req, res) => {
  try {
    var channel = req.body.channel || 'general'
    var oldest = parseTimestamp(Date.now() * 1000, req.body.hours)
    var user = req.body.user
    const result = await importHistory(res, channel, oldest, user)
    res.json(result)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getSlackUsers,
  getAllByUser,
  getChannels,
  getChannelHistory,
  getChannelHistoryWithParameters,
}
