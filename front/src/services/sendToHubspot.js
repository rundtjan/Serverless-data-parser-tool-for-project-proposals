import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}?route=sendToHubspot` // eslint-disable-line

const sendJSON = async(assignedWords) => {
  const sendData = JSONfromAssignedWords(assignedWords)
  const res = await axios.post(baseUrl, JSON.stringify(sendData))
  return res.data
}
const updateDeal = async(id, assignedWords) => {
  const properties = propertiesOfAssignedWords(assignedWords)
  const sendData = { dealId: id, properties: properties }
  const updateUrl = `${baseUrl}?route=updateDeal`
  const res = await axios.post(updateUrl, JSON.stringify(sendData))
  console.log('res ' + JSON.stringify(res))
  return res.data
}
const propertiesOfAssignedWords = (assignedWords) => {
  const obj = {}
  assignedWords.forEach(word => {
    obj.push(`${word.category}:${word.word}`)
  })
  return obj
}

const JSONfromAssignedWords = (assignedWords) => {
  const JSONObj = {}
  assignedWords.forEach(word => {
    if (!JSONObj[word.category]) JSONObj[word.category] = []
    JSONObj[word.category].push(word.word)
  })
  console.log('jsonObj '+JSONObj)
  return JSONObj
}

export default { sendJSON, updateDeal }
