const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const { addThreadsToMessages } = require('../application/processSlackMessages')
const { GetHumanMessagesFromSlack } = require('../application/filterSlackResponse')
const savedQueries = {}
const app = require('../app')

async function saveQuery(res, args) {
  try {
    const id = await importHistory(res, args, true)
    res.json({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Your query is ready at : http://135.181.37.120:80/${id}`,
            //text: `Your query is ready at : http://localhost/api/parse/${id}`,
          },
        },
      ],
    })
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

async function importHistory(res, args, save = false) {
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
    if (!save) res.send(resultObj)
    else {
      const id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
      savedQueries[id] = resultObj
      return id
    }
  } catch (error) {
    if (error) {
      console.error(error)
      res.status(500).send(`${error.message}`)
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

/**
 * Parses parameters and calls an api to get messages from a single thread.
 * @param {Object} payload Gives essential information when shortcut is used in workspace.
 */
async function getAllMessagesFromSingleThread(payload) {
  const channelId = payload.channel.id
  const threadTimestamp = payload.message.thread_ts
  const triggerId = payload.trigger_id
  console.log(triggerId)
  const args = {channel: channelId, ts: threadTimestamp}
  const threadWithResponses = await slack.getThreadMessages(args)

  const viewObject = {
    'trigger_id': triggerId,
    'title': {
      'type': 'plain_text',
      'text': 'Parsing a thread'
    },
    'submit': {
      'type': 'plain_text',
      'text': 'Submit'
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
    ],
    'type': 'modal'
  }
  console.log(threadWithResponses)
  app.post('https://slack.com/api/views.open', (viewObject, res) => {
    console.log(viewObject)
    console.log(res)
  })
}

module.exports = {
  importHistory,
  slackChannels,
  slackUsers,
  slackGetAllByUser,
  saveQuery,
  returnQuery,
  getAllMessagesFromSingleThread,
}
