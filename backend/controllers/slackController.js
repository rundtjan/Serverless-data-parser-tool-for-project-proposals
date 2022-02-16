const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const { addThreadsToMessages } = require('../application/processSlackMessages')
const {
  GetHumanMessagesFromSlack,
  filterMessagesByUser,
} = require('../application/filterSlackResponse')
const savedQueries = {}

async function saveQuery(res, args) {
  // channel, oldest, user are contained in args
  const { channel } = args
  const { user } = args
  const { oldest } = args
  try {
    const id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
    const channels = await slack.getChannels()
    var channelId = channels.channels.filter((obj) => {
      return obj.name == channel || obj.id == channel
    })[0].id
    const result = await slack.getChannelMessages(channelId)
    let messages = result.reverse()

    messages = GetHumanMessagesFromSlack(result)
    args.messages = messages
    args.channelId = channelId
    const resultObj = await addThreadsToMessages(res, slack, args)
    savedQueries[id] = resultObj
    //slack.sendMessage(channelId, `Your query is ready at : http://135.181.37.120/${id}`)
    //console.log('saved result: ', savedQueries[id])
    res.json({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Your query is ready at : http://135.181.37.120:9999/api/parse/${id}`,
          },
        }
      ],
    })
  } catch (error) {
    if (error) {
      console.error(error)
      res.sendStatus(501)
    }
  }
}

async function returnQuery(res, id) {
  try {
    if (id in savedQueries) {
      res.send(savedQueries[id])
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    if (error) {
      console.error(error)
      res.sendStatus(501)
    }
  }
}

async function importHistory(res, args) {
  // channel, oldest, user are contained in args
  const { channel } = args
  try {
    const channels = await slack.getChannels()
    var channelId = channels.channels.filter((obj) => {
      return obj.name == channel || obj.id == channel
    })[0].id
    const result = await slack.getChannelMessages(channelId)
    let messages = result.reverse()

    messages = GetHumanMessagesFromSlack(result)
    args.messages = messages
    args.channelId = channelId

    const resultObj = await addThreadsToMessages(res, slack, args)
    res.send(resultObj)
  } catch (error) {
    if (error) {
      console.error(error)
      res.send('Error in getting data.', error)
    }
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
module.exports = {
  importHistory,
  slackChannels,
  slackUsers,
  slackGetAllByUser,
  saveQuery,
  returnQuery,
}
