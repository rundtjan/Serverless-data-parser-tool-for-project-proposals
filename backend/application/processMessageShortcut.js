// This file is supposed to be like "processSlackMessages"
// it should create an similar object what "processSlackMessages" create
// this makes the frontend behave like assumed and prevents the frontend from exploding

const {
  GetWordsFromMessages,
  GetHumanMessagesFromSlack,
} = require('../application/filterSlackResponse')

async function processMessageShortcut(slack, threadWithResponses) {
  const humanMessagesFromThread = GetHumanMessagesFromSlack(threadWithResponses)
  const wordsFromThread = GetWordsFromMessages(threadWithResponses)
  console.log(humanMessagesFromThread)
  console.log(wordsFromThread)
  try {
    console.log(slack)
    console.log(threadWithResponses)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { processMessageShortcut }