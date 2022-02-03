const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('messages are returned as json', async () => {
  await api
    .get('/api/data/C02UNV80V7B')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('channels are returned as json', async () => {
  await api
    .get('/api/channels')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})