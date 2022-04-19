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
  let company = false
  let price = false

  // Goes through list with technology words.
  const technology = technologies.has(word)
  
  let letters = word.split('')

  // Only company words consist of separeta words, hence words inclding space are categorized as companies. 
  if(letters.find(l => l=== ' ')) {
    company = true
  }
  if(letters.find(l => l === '€' || l === '$')) {
    price = true
  }
  if(letters.find(l => !isNaN(l) && l !== ' ' && l !== 0)) {
    number = true
  }
  if(letters.find(l => l === '.' || l === '-' || l === '/')) {
    specialCharacter = true
  }
  // If a word has date separator, is a number, but doesn't include euro or dollar signs, the word is asigned as deadline. 
  if(specialCharacter && number && !price) {
    date = true
  } 
  
  if (technology) {
    return 'Technology'
  } else if (company) {
    return 'Customer' 
  } else if (date) {
    return 'Deadline'
  } else if (price && number) {
    return 'Price'
  } else {
    return ''
  }
}

module.exports = { assignCategoryToWord }