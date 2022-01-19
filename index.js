require('dotenv').config()
//const app = require('/app.js');
const express = require('express')
var importHistory = require('./utils/importHistory.js');
const app = express()
const slackToken = process.env.SLACK_TEST_TOKEN;

app.use(express.static('build'))

//you will need valid channel ids for testing
app.get('/api/data/:channelid', (req, res) => {
    importHistory(req.params.channelid, slackToken, res);
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})