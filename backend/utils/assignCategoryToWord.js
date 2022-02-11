const technologies = require('./technologies.json')

function assignCategoryToWord(word) {
    let date = false
    let numbers = false 
   
    if (technologies.map(tec => tec.toLowerCase().includes(word))) {
        return 'Technology'
    } else  if (date) {
        return 'date'
    } else if (numbers) {
        return 'numbers'
    } else {
        return 'no category'
    }
}

module.exports = { assignCategoryToWord }