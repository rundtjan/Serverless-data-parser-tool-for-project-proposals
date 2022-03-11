const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const { processSlackMessages } = require('../application/processSlackMessages')
const savedQueries = {}

let paramUser = ''
let paramChannel = 'general'
let paramHours = ''

function slackResponse (args, id) {
  const user =   args.user ? `user: ${args.user}` : 'user: not given'
  const channel = `channel: ${args.channel}`
  const time = args.hours ? `time: ${args.hours} h` : 'time: not given'
  paramUser = args.user ? args.user : ''
  paramChannel = args.channel
  paramHours = args.hours ? args.hours : ''

  return  {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Your query, with parameters: ${user}, ${channel} and ${time} is ready at : http://135.181.37.120:80/${id}`,
          // text: `Your query is ready at : http://localhost/api/parse/${id}`,
        },
      },
    ],
  }
}

async function saveQuery(res, args) {
  try {
    const id = await slackMessages(res, args, true)
    res.json(slackResponse(args, id))
  } catch(error) {
    console.log(error)
  }
}

async function returnQuery(res, id) {
  try {
    if (id in savedQueries) {
      res.send(savedQueries[id])
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    if (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
}

async function slackMessages(res, args, save = false) {
  try {
    const resultObj = await processSlackMessages(slack, args)
    if (!save) res.send(resultObj)
    else {
      const id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
      savedQueries[id] = resultObj
      return id
    }
  } catch (error) {
    res.send(error.error)
  }
}

async function slackChannels(res) {
  try {
    const result = await slack.getChannelNames()
    res.send(result)
  } catch (error) {
    res.send(error.data.error)
  }
}

async function slackUsers(res) {
  try {
    const result = await slack.getUsers()
    res.send(result)
  } catch (error) {
    res.send(error.data.error)
  }
}

async function slackGetAllByUser(res, id) {
  try {
    const messages = await slack.findAllByUser(id)
    res.send(messages)
  } catch (error) {
    res.send(error)
  }
}
async function getParams(res) {
  try {
    const params =  { paramChannel, paramUser, paramHours }
    res.send(params)
  } catch (error) {
    res.send(error)
  }
}
module.exports = {
  slackMessages,
  slackChannels,
  slackUsers,
  slackGetAllByUser,
  saveQuery,
  returnQuery,
  slackResponse,
  getParams,
}
