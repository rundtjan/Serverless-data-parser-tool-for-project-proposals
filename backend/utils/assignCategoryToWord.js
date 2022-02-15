const technologies = require('./technologies.json')

function assignCategoryToWord(word) {
  let date = false
  let number = false
  let dot = false

  const technology = technologies.find(t => t.toLowerCase() === word)
  let letters = word.split('')

  const checkWord = () => {
    if(letters.find(l => !isNaN(l))) {
      number = true
    }
    if(letters.find(l => l === '.')) {
      dot = true
    }
    if(dot && number) {
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