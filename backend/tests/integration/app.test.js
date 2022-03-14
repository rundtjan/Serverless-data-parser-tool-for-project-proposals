const request = require('supertest')

const app = require('../../app')

jest.mock('@slack/web-api', () => {
  const mock_users = jest.fn()
  const mock_channels = jest.fn()
  const mock_history = jest.fn()
  const mock_reply = jest.fn()

  const {
    users_response,
    channels_response,
    history_response,
    thread_response,
  } = require('../service/slack_responses')

  mock_users.mockReturnValue(users_response)
  mock_channels.mockReturnValue(channels_response)
  mock_history.mockReturnValue(history_response)
  mock_reply.mockReturnValue(thread_response)

  const mock_Slack = {
    users: {
      list: mock_users,
    },
    conversations: {
      list: mock_channels,
      history: mock_history,
      replies: mock_reply,
    },
  }
  return { WebClient: jest.fn(() => mock_Slack), LogLevel: jest.fn() }
})

describe('Test Endpoints', () => {
  test('GET /api/channels', (done) => {
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

  test('GET /api/users', (done) => {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.length).toEqual(3)
        expect(res.body).toContainEqual({
          id: 'U02UAB8HUFM',
          real_name: 'RealNameTwo',
          username: 'testusertwo',
        })
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /api/data', (done) => {
    request(app)
      .post('/api/data')
      .send({ channel: 'test_general' })
      .expect(200)
      //.expect('Content-Type', /json/)
      .expect((res) => {
        console.log(res.body)
        expect(res.body.messages.length).toEqual(2)
        expect(res.body.words).toContainEqual({
          word: 'django',
          message_ids: ['3480404c-8998-4af4-9023-2ca5cf339f8f'],
          count: 1,
          important: false,
          category: 'Technology',
        })
      })
      .end((err) => {
        if (err) return done(err)
        return done()
      })
  })
})
