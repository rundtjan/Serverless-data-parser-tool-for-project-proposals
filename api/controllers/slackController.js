const { slackService } = require('../services/slackService')
const { slackClient } = require('../services/slackClient')
const slack = slackService({ slackClient })
const { processSlackMessages } = require('../application/processSlackMessages')
const { processMessageShortcut, processOneMessage } = require('../application/processMessageShortcut')
//const { GetWordsFromMessages } = require('../application/filterSlackResponse')

// Default values for parameters
let paramUser = ''
let paramChannel = 'general'
let paramHours = ''

/**
 * Generates the id for the query and stores it to the global query object.
 * @param {Object} args Contains user, channel and oldest parameters which are used in filtering.
 * @returns the result of getting messages.
 */
async function slackMessages(args) {
  try {
    const resultObj = await processSlackMessages(slack, args)
    return resultObj
  } catch (error) {
    console.log('error in slackMessages', error)
    return error.error
  }
}

/**
 * Gets every channel name from the Slack workspace and returns them.
 */
async function slackChannels() {
  try {
    const result = await slack.getChannelNames()
    return result
  } catch (error) {
    console.log('error in slackChannels', error)
    return error
  }
}

/**
 * Get's every user from the Slack Workspace.
 * @param {Object} res HTTP response.
 */
async function slackUsers(res) {
  try {
    const result = await slack.getUsers()
    res.send(result)
  } catch (error) {
    res.send(error.data.error)
  }
}

async function replyToChannel(id, text) {
  try {
    const result = await slack.sendMessageBlocks(id, text)
    return result
  } catch(error) {
    console.log('error in sending to channel ', error)
    return error
  }
}

async function replyToThread(id, ts, text) {
  try {
    const result = await slack.replyMessageBlocks(id, ts, text)
    return result
  } catch (error){
    console.log('error in sending reply ', error)
    return error
  }
}

/**
 * Get every message from a Slack user by user's id.
 * @param {Object} res HTTP Response.
 * @param {Object} id Users id in Slack.
 */
async function slackGetAllByUser(res, id) {
  try {
    const messages = await slack.findAllByUser(id)
    res.send(messages)
  } catch (error) {
    res.send(error)
  }
}

/**
 * Get's global parameters which are needed for showing the parameters in the UI.
 * @param {Object} res HTTP Response.
 */
async function getParams(res) {
  try {
    const params =  { paramChannel, paramUser, paramHours }
    res.send(params)
  } catch (error) {
    res.sed(error)
  }  
}

/**
 * Parses parameters and calls an api to get messages from a single thread.
 * @param {Object} payload Gives essential information when shortcut is used in workspace.
 */
async function getAllMessagesFromSingleThread(args) {
  try {
    const threadWithResponses = await slack.getThreadMessages(args)
    const resultObj = await processMessageShortcut(slack, threadWithResponses)
    return resultObj
  } catch (error) {
    return error
  }
}
async function getOneMessage(args) {
  try {
    console.log('in slackCOntroller oneMessage args ', args)
    console.log('getOneMessage ts, channel ', args.ts, args.channel)
    const message = await slack.getOneMessageByTs(args.ts, args.channel)
    console.log('message: ', message)
    const resultObj = await processOneMessage(slack, message)
    console.log('slackCOntroller getOnmessage final resultObj ', resultObj)
    return resultObj
  } catch (error) {
    return error
  }
}

module.exports = {
  slackMessages,
  slackChannels,
  slackUsers,
  slackGetAllByUser,
  getAllMessagesFromSingleThread,
  getParams,
  replyToThread,
  replyToChannel,
  getOneMessage
}