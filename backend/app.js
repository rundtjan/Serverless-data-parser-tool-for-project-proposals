require('dotenv').config()
const express = require('express')
const app = express()
var importHistory = require('./utils/importHistory.js')
const parseSlackTimestamp = require('./utils/parseSlackTimestamp')
const slackChannels = require('./utils/slackChannels.js')
const slackUsers = require('./utils/slackUsers.js')
const slackToken = process.env.SLACK_TOKEN
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

//you will need valid channel ids for testing
app.get('/api/data/:channelid', (req, res) => {
  importHistory(req.params.channelid, slackToken, res)
})

app.get('/api/channels', (req, res) => {
  slackChannels(slackToken, res)
})

app.get('/api/users', (req, res) => {
  slackUsers(slackToken, res)
})

app.post('/api/data', (req, res) => {
  //expects a post with data in format, all parameters are optional: {"channel": CHANNEL_ID, "hours": HOW_MANY_HOURS_BACK, "user": USER_ID}
  var channel = req.body.channel || 'C02UNV80V7B'
  var oldest = parseSlackTimestamp(Date.now() * 1000, req.body.hours)
  var user = req.body.user

  importHistory(slackToken, res, channel, oldest, user)

  //res.json({'channel': channel, 'oldest': oldest, 'user': user})
})

module.exports = app
