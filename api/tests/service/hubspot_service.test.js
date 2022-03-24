const hubspot = require('@hubspot/api-client')
const hubspotService = require('../../services/hubspotService')

const hubspotClient = new hubspot.Client({ apiKey: 'testKey' })
const hs = hubspotService({ hubspotClient })

jest.mock('@hubspot/api-client', () => {
  const mock_deals = jest.fn()
  const allDeals = require('./hubspot_responses')

  mock_deals.mockReturnValue(allDeals)

  const mock_Hubspot = {
    crm: {
      deals: {
        basicApi: {
          getPage: mock_deals,
        },
      },
    },
    Client: jest.mock()
  }
  return { Client: jest.fn(() => mock_Hubspot) }
})

test('Hubspot returns a list of all deals', async () => {
  const deals = await hs.getAllDeals()
  expect(deals.length).toBe(3)
})
