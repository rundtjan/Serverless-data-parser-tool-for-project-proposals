const { slackResponse } = require('../../controllers/slackController')
/* eslint-disable */

test('Query with parameters returns text with parameters', () => {
  const args = { channel: 'general', user: '@user', oldest: false, hours: 2 }
  const id = 1234
  const result = slackResponse(args, id)
  expect(result).toEqual(
    {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Your query, with parameters: user: @user, channel: general and time: 2 h is ready at : http://135.181.37.120:80/1234"
          }
        }
      ]
    }
  )
})

test('Query with no parameters returns text with only channel parameter', () => {
  const args = { channel: 'general', user: null, oldest: false, hours: null }
  const id = 1234
  const result = slackResponse(args, id)
  expect(result).toEqual(
    {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Your query, with parameters: user: not given, channel: general and time: not given is ready at : http://135.181.37.120:80/1234"
          }
        }
      ]
    }
  )
})

test('Query with hour parameter includes time, but not user in text', () => {
  const args = { channel: 'general', user: null, oldest: false, hours: 3 }
  const id = 1234
  const result = slackResponse(args, id)
  expect(result).toEqual(
    {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Your query, with parameters: user: not given, channel: general and time: 3 h is ready at : http://135.181.37.120:80/1234"
          }
        }
      ]
    }
  )
})