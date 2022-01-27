require('dotenv').config()
const express = require('express')
const app = express()
var importHistory = require('./utils/importHistory.js')
const slackToken = process.env.SLACK_TOKEN
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

//you will need valid channel ids for testing
app.get('/api/data/:channelid', (req, res) => {
  importHistory(req.params.channelid, slackToken, res)
})

app.post('/api/paramizedData', (req, res) => {
  const now = Date.now();
  console.log(now);
  console.log(req.body)
  res.send(req.body)
})

module.exports = app
