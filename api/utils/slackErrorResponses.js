const invalidNumberOfArguments = (number) => {
  const obj = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Incorrect number of parameters : ${number}`,
        },
      },
    ],
  }
  return obj
}

const errorResponseObject = (message) => {
  const obj = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Sorry, that didn't work: ${message}`,
        },
      },
    ],
  }
  return obj
}
module.exports = {invalidNumberOfArguments, errorResponseObject}