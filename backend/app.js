require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {
  importHistory,
  slackChannels,
  slackUsers,
  slackGetAllByUser,
  returnQuery,
  saveQuery,
} = require('./controllers/slackController.js')
const { parseTimestamp } = require('./utils/parseSlackTimestamp')
const { parseParameters } = require('./utils/parseParameters.js')

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
  const args = { channel, user, oldest }
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
  const args = { channel, user, oldest }
  importHistory(res, args)
})

app.post('/api/parse', (req, res) => {
  //expects a post with data in format, all parameters are optional: {"channel": CHANNEL_NAME, "user": USER_NAME, "hours": HOW_MANY_HOURS_BACK}
  const params = req.body.text.split(' ')
  /** 
   * @TODO: FIX, works with user but not with hours.
  if (params.length !== 3) {
    const parsedParams = parseParameters(params)
    saveQuery(res, parsedParams)
  }
  */
  const channel = params[0] || 'general'
  // username wil be in format @user.name for example @aleksi.suuronen and needs to be implemented
  const user = params[1]
  const hours = params[2]
  const oldest = parseTimestamp(Date.now() * 1000, hours)
  const args = {channel, user, oldest }
  saveQuery(res, args)
})

app.get('/api/parse/:id', (req, res) => {
  returnQuery(res, req.params.id)
})

module.exports = app
