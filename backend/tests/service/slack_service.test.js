const { WebClient } = require('@slack/web-api')

const slackClient = new WebClient('testtoken')

const { slackService } = require('../../services/slackService')
const slack = slackService({ slackClient })


jest.mock('@slack/web-api', () => {
  const mock_users = jest.fn()
  const { users_response } = require('./slack_responses')
  mock_users.mockReturnValue(users_response)
  const users_Slack = {
    users: {
      list: mock_users,
    },
  }
  return { WebClient: jest.fn(() => users_Slack) }
})

test('return a list of posts by a user', async () => {
  const users = await slack.getUsers()
  expect(slackClient.users.list).toBeCalledTimes(1)
  expect(users.length).toBe(3)
  expect(users).toContainEqual({
    id: 'U02U7N423SR',
    real_name: 'RealNameOne',
    username: 'testuserone'
  })
})
