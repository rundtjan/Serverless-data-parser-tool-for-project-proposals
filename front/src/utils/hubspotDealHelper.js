/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux'
import { setAssignedWord } from '../reducers/assignReducer'


export const parseHubspotDealProperties = (properties) => {
  const categories = ['Customer', 'Price', 'Deadline', 'FTEs', 'Contact', 'Technology']

  const x = properties.description.split(/,|:/).map(w => w.trim())

  const obj = handleText(x, categories)

  return obj
}

/**
 * Todo
 * @param {*} text
 * @param {*} categories
 * @returns
 */
const handleText = (text, categories) => {
  //[a, b, c] => {a: [], b:[], c:[]}
  const obj = categories.reduce((p, c) => ({ ...p, [c]: [] }), {})

  let category = ''
  for(let i = 0; i < text.length; i++) {
    let word = text[i]

    if(categories.includes(word)) {
      category = word
    } else {
      obj[category] = [...obj[category], word]
    }
  }
  return obj
}


//'FTEs: 1278, Deadline: 13/2/2022, Contact: ipsum, Technology: c++,java,javascript,c#'


