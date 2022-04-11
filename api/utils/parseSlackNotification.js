/**
 * A function which parses a notification to Slack that a deal has been created or updated
 * for parsing messages.
 * @param {*} customer the name of the customer the deal has been made with
 * @param {*} action a string, either: "created" or "updated"
 * @param {*} type a string, either: "channel" or "thread"
 * @param {*} link a string, the url to the deal in hubspot
 * @returns the complete response-object
 */
const response = (customer, action, type, link, dealname) => {
  let dealName
  dealname ? dealName = dealname : dealName = `Deal ${customer}`
  const blocks = [
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `A deal with customer ${customer} has been ${action} in Hubspot using parsed data from this ${type}.`
      }
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `The deal is called: '${dealName}'`
      }
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `View it in Hubspot at: ${link}`
      }
    }
  ]

  return blocks

}

module.exports = response
