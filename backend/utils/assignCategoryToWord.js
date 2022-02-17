const { technologies } = require('./technologies')

function assignCategoryToWord(word) {
  let date = false
  let number = false
  let specialCharacter = false

  const technology = technologies.has(word)
  let letters = word.split('')

  const checkWord = () => {
    if(letters.find(l => !isNaN(l) && l !== ' ')) {
      number = true
    }
    if(letters.find(l => l === '.' || l === '-' || l === '/')) {
      specialCharacter = true
    }
    if(specialCharacter && number) {
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