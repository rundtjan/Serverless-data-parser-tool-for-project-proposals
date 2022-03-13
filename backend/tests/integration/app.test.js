const request = require('supertest')

const app = require('../../app')

jest.mock('@slack/web-api', () => {
  const mock_users = jest.fn()
  const mock_channels = jest.fn()
  const { users_response, channels_response } = require('../service/slack_responses')

  mock_users.mockReturnValue(users_response)
  mock_channels.mockReturnValue(channels_response)

  const mock_Slack = {
    users: {
      list: mock_users,
    },
    conversations: {
      list: mock_channels,
    },
  }
  return { WebClient: jest.fn(() => mock_Slack), LogLevel: jest.fn() }
})

describe('Test Endpoints', () => {
  test('GET /channels', (done) => {
    request(app)
      .get('/api/channels')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.length).toEqual(2)
        expect(res.body).toContain('test_general')
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })
})
