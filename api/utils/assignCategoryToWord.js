const { technologies } = require('./technologies')

/**
 * Checks if a given word belongs to any category. 
 * @param {word from splitted slack messages} word 
 * @returns A string with the category whith the category name the word belongs to or '' if the word has no category.
 */
function assignCategoryToWord(word) {
  let date = false
  let number = false
  let specialCharacter = false
  let specials = false
  let company = false

  // Goes through list with technology words.
  const technology = technologies.has(word)
  
  let letters = word.split('')

  const checkWord = () => {
    if(letters.find(l => l=== ' ')) {
      company = true
    }
    if(letters.find(l => l === '€' || l === '$')) {
      specials = true
    }
    if(letters.find(l => !isNaN(l) && l !== ' ' && l !== 0)) {
      number = true
    }
    if(letters.find(l => l === '.' || l === '-' || l === '/')) {
      specialCharacter = true
    }
    // If a word has date separator, is a number, but doesn't include euro or dollar signs, the word is asigned as date. 
    if(specialCharacter && number && !specials) {
      date = true
    } 
  }

  checkWord()

  
  if (technology) {
    return 'Technology'
  } else if (company) {
    return 'Company' 
  } else if (date) {
    return 'Date'
  } else if (number) {
    return 'Number'
  } else {
    return ''
  }
}

module.exports = { assignCategoryToWord }