const {
  isNumeric,
  parameterIsUsername,
  parameterIsHours
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