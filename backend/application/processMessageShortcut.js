// This file is supposed to be like "processSlackMessages"
// it should create an similar object what "processSlackMessages" create
// this makes the frontend behave like assumed and prevents the frontend from exploding

const { GetHumanMessagesFromSlack } = require('./filterSlackResponse')
const { addNamesToMessages } = require('./processSlackMessages')

/**
 * 
 * @param {*} slack 
 * @param {*} threadWithResponses 
 * @returns 
 */
async function processMessageShortcut(slack, threadWithResponses) {
  const oldest = undefined
  const user = undefined
  try {
    const humanMessagesFromThread = GetHumanMessagesFromSlack(threadWithResponses)
    const resultObj = await addNamesToMessages(slack, humanMessagesFromThread, oldest, user)
    console.log(resultObj)
    return resultObj
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { processMessageShortcut }