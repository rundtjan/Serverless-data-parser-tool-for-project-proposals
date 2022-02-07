require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { importHistory, slackChannels, slackUsers, slackGetAllByUser} = require('./controllers/slackController.js')
const { parseTimestamp } = require('./utils/parseSlackTimestamp')
app.use(cors())
app.use(express.static('build'))
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.get('/api/data/:channelId', (req, res) => {
  const channel = req.params.channelId
  const oldest = parseTimestamp(Date.now() * 1000, req.body.hours)
  const user = req.body.user
  const args = {channel, user, oldest}
  importHistory(res, args)
})

app.get('/api/channels', (req, res) => {
  slackChannels(res)
})

app.get('/api/users', (req, res) => {
  slackUsers(res)
})

app.get('/api/users/:id', (req, res) => {
  slackGetAllByUser(res, req.params.id)
})

app.post('/api/data', (req, res) => {
  //expects a post with data in format, all parameters are optional: {"channel": CHANNEL_NAME, "hours": HOW_MANY_HOURS_BACK, "user": USER_NAME}
  const channel = req.body.channel || 'general'
  const oldest = parseTimestamp(Date.now() * 1000, req.body.hours)
  const user = req.body.user
  const args = {channel, user, oldest}
  importHistory(res, args)
})

module.exports = app
