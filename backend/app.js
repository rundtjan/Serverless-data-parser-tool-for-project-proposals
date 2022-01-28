require('dotenv').config()
const express = require('express')
const app = express()
var importHistory = require('./utils/importHistory.js')
const slackToken = process.env.SLACK_TOKEN
const cors = require('cors')
const threadTimeStamp = '1643101417.000800'
app.use(cors())
app.use(express.static('build'))

//you will need valid channel ids for testing
app.get('/api/data/:channelid', (req, res) => {
  importHistory(req.params.channelid, slackToken, res, threadTimeStamp)
})

module.exports = app
