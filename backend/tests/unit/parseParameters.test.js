const {
  isNumeric,
  parameterIsUsername,
  parameterIsHours,
  parameterIsValidChannel,
  parseParameters,
} = require('../../utils/parseParameters')

test('Hours are parsed and returned correctly with valid value', () => {
  const hours = 24
  expect(parameterIsHours(hours)).toBeTruthy
  const stringHours = '24'
  expect(parameterIsHours(stringHours)).toBeTruthy
})

test('Hours are parsed correctly and returned correctly with invalid value', () => {
  const hours = 'general'
  const hoursNan = NaN
  const hoursUndefined = undefined
  const hoursNull = null
  expect(parameterIsHours(hours)).toBeFalsy
  expect(parameterIsHours(hoursNan)).toBeNaN
  expect(parameterIsHours(hoursUndefined)).toBeUndefined
  expect(parameterIsHours(hoursNull)).toBeNull
})

test('Valid and invalid usernames are parsed and returned correctly', () => {
  const username = '@test.user'
  expect(parameterIsUsername(username)).toBeTruthy
  const invalidUsername = 'general'
  expect(parameterIsUsername(invalidUsername)).toBeFalsy
})

test('Numeric values are parsed and returned correctly',() => {
  const numeric = 124
  expect(isNumeric(numeric)).toBeTruthy
  const notNumeric = 'general'
  expect(isNumeric(notNumeric)).toBeFalsy
})

test('Valid channel name is found correctly', async () => {
  const channels = [
    {
      id: 'C02UCV0GQJZ',
      name: 'channel-two',
    },
    {
      id: 'C02UNV80V7B',
      name: 'general',
    },
    {
      id: 'C02V02LBQGG',
      name: 'random',
    },
    {
      id: 'C033WM9HGAZ',
      name: 'demo_channel',
    }
  ]
  const result = await parameterIsValidChannel(channels[3])
  expect(result).toBeTruthy
})

test('Invalid channel name gives error correctly', async() => {
  const result = await parameterIsValidChannel('Cat-pictures')
  expect(result).toBeFalsy
})

test('Parameters are returned correctly if zero parameters', async() => {
  const params = []
  const sourceChannel = 'demo_channel'
  const res = await parseParameters(params, sourceChannel)
  expect(res).toStrictEqual(
    {
      'channel': sourceChannel,
      'user': null,
      'oldest': false,
      'hours': null,
    }
  )
})