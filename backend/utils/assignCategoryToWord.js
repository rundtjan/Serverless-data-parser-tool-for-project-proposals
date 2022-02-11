const technologies = require('./technologies.json')

function assignCategoryToWord(word) {
  let date = false
  let numbers = false

  const technology = technologies.find(t => t.toLowerCase() === word)

  if (technology) {
    return 'Technology'
  } else if (date) {
    return 'date'
  } else if (numbers) {
    return 'numbers'
  } else {
    return ''
  }
}

module.exports = { assignCategoryToWord }