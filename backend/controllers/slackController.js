const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const {addThreadsToMessages} = require('../application/processSlackMessages')

const {
  GetHumanMessagesFromSlack,
  // GetWordsFromMessages,
  // GetRealNamesFromSlack,
  // GetThreads,
  // GetTimeStamps,
  // AddThreadToParent,
  // filterOutOldMessages,
  // filterMessagesByUser
} = require('../application/filterSlackResponse')

async function importHistory(res, args) {
  const {channel, oldest, user} = args
  try {
    const channels = await slack.getChannels()
    var channelId = channels.channels.filter(obj => {
      return obj.name == channel || obj.id == channel
    })[0].id
    const result = await slack.getChannelMessages(channelId)
    let messages = result.reverse()
    
    messages = GetHumanMessagesFromSlack(result)

    const resultObj = await addThreadsToMessages(res, slack, channelId, messages, oldest, user)
    res.send(resultObj)
  } catch (error) {
    if (error){
      console.error(error)
      res.send('Error in getting data.')
    }
  }
}

async function slackChannels(res){
  try {
    const result = await slack.getChannelNames()
    res.send(result)
  } catch (error){
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
module.exports = {importHistory, slackChannels, slackUsers, slackGetAllByUser}