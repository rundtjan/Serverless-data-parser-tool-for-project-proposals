const { WebClient } = require('@slack/web-api')

const slackClient = new WebClient('testtoken')

const { slackService } = require('../../services/slackService')
const slack = slackService({ slackClient })


jest.mock('@slack/web-api', () => {
  const mock_users = jest.fn()
  const mock_channels = jest.fn()
  const { users_response, channels_response } = require('./slack_responses')

  mock_users.mockReturnValue(users_response)
  mock_channels.mockReturnValue(channels_response)

  const mock_Slack = {
    users: {
      list: mock_users,
    },
    conversations: {
      list: mock_channels,
    }
  }
  return { WebClient: jest.fn(() => mock_Slack) }
})

test('slack returns a list of users', async () => {
  const users = await slack.getUsers()
  
  expect(users.length).toBe(3)
  expect(users).toContainEqual({
    id: 'U02U7N423SR',
    real_name: 'RealNameOne',
    username: 'testuserone'
  })

  const users_from_cache = await slack.getUsers()

  expect(users_from_cache.length).toBe(3)
  expect(users_from_cache).toContainEqual({
    id: 'U02U7N423SR',
    real_name: 'RealNameOne',
    username: 'testuserone'
  })
  expect(slackClient.users.list).toBeCalledTimes(1)
})

test('slack returns a list of available channels', async () => {
  const channels = await slack.getChannels()

  expect(channels.length).toBe(2)
  expect(channels).toContainEqual({
    id: 'C02UNV80V7B',
    name: 'test_general'
  })

  const channels_from_cache = await slack.getChannels()
  
  expect(slackClient.conversations.list).toBeCalledTimes(1)
  expect(channels_from_cache.length).toBe(2)
  expect(channels_from_cache).toContainEqual({
    id: 'C02UNV80V7B',
    name: 'test_general'
  })
})