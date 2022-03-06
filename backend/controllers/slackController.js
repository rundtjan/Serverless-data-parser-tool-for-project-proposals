const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const { processSlackMessages } = require('../application/processSlackMessages')
const { processMessageShortcut } = require('../application/processMessageShortcut')
const savedQueries = {}

async function saveQuery(res, args) {
  try {
    const id = await slackMessages(res, args, true)
    let user = args.user ? `user: ${args.user}` : 'user: not given'
    let channel = `channel: ${args.channel}`
    let time = args.hours ? `time: ${args.hours} h` : 'time: not given'
    res.json({
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
    })
  } catch (error) {
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
      const id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
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

/**
 * Parses parameters and calls an api to get messages from a single thread.
 * @param {Object} payload Gives essential information when shortcut is used in workspace.
 */
async function getAllMessagesFromSingleThread(res, requestPayload) {
  const payload = JSON.parse(requestPayload)
  //console.log(payload)
  const channelId = payload.channel.id
  const threadTimestamp = payload.message.thread_ts
  const args = { channel: channelId, ts: threadTimestamp }
  try {
    const threadWithResponses = await slack.getThreadMessages(args)
    //console.log(threadWithResponses)
    const resultObj = await processMessageShortcut(slack, threadWithResponses)
    console.log(resultObj)
    const id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
    savedQueries[id] = resultObj
    res.json({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Thread ready at : http://135.181.37.120:80/api/parse/${id}`,
            // text: `Your query is ready at : http://localhost/api/parse/${id}`,
          },
        },
      ],
    })
  } catch (error) {
    res.send(error)
  }
  /**
   * Modal thing, not working and gives a mysterious "Invalid arguments" error
   * Says a type is missing or something
  const modalView = {
    'type': 'modal',
    'title': {
      'type': 'plain_text',
      'text': 'Parsing a thread'
    },
    'blocks': [
      {
        'type': 'section',
        'text': {
          'type': 'plain_text',
          'text': 'Are you sure you want to send this thread to Parsa?',
          'emoji': true
        }
      }
    ]
  }
  const triggerId = payload.trigger_id
  const viewObject = {trigger_id:triggerId, view:modalView}
  const x = await slack.sendModalView(triggerId, viewObject)
  console.log(x)
  */
}

module.exports = {
  slackMessages,
  slackChannels,
  slackUsers,
  slackGetAllByUser,
  saveQuery,
  returnQuery,
  getAllMessagesFromSingleThread,
}
