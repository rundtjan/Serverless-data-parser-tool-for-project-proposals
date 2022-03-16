module.exports = (responseText) => {
  resJson = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: responseText,
        },
      },
    ],
  }
  return resJson
}