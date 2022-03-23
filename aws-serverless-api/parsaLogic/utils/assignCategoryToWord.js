const { technologies } = require('./technologies')

function assignCategoryToWord(word) {
  let date = false
  let number = false
  let specialCharacter = false
  let specials = false

  const technology = technologies.has(word)
  let letters = word.split('')

  const checkWord = () => {
    if(letters.find(l => l === '€' || l === '$')) {
      specials = true
    }
    if(letters.find(l => !isNaN(l) && l !== ' ' && l !== 0)) {
      number = true
    }
    if(letters.find(l => l === '.' || l === '-' || l === '/')) {
      specialCharacter = true
    }
    if(specialCharacter && number && !specials) {
      date = true
    } 
  }

  checkWord()

  if (technology) {
    return 'Technology'
  } else if (date) {
    return 'Date'
  } else if (number) {
    return 'Number'
  } else {
    return ''
  }
}

module.exports = { assignCategoryToWord }