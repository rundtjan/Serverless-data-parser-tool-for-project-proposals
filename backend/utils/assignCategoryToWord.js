const technologies = require('./technologies.json')

function assignCategoryToWord(word) {
  let date = false
  let number = false

  const technology = technologies.find(t => t.toLowerCase() === word)
  let letters =  word.split('')
  
  const isNumber = () => {
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i]
      if (!isNaN(letter)) {
        number = true 
        return
      }
    }
  }

  isNumber()

  if (technology) {
    return 'Technology'
  } else if (date) {
    return 'date'
  } else if (number) {
    return 'Number'
  } else {
    return ''
  }
}

module.exports = { assignCategoryToWord }