const invalidAmountOfArguments = (number) => {
  const obj = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `incorrect number of parameters : ${number}`,
        },
      },
    ],
  }
  return obj
}
module.exports = invalidAmountOfArguments
