import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL // eslint-disable-line

const sendJSON = async(assignedWords) => {
  const sendUrl = `${baseUrl}?route=sendToHubspot`
  const sendData = JSONfromAssignedWords(assignedWords)
  const res = await axios.post(sendUrl, JSON.stringify(sendData))
  return res.data
}
const updateDeal = async(id, assignedWords) => {
  const properties = JSONfromAssignedWords(assignedWords) //propertiesOfAssignedWords(assignedWords)
  const sendData = { dealId: id, properties: properties }
  console.log(JSON.stringify(sendData))
  const updateUrl = `${baseUrl}?route=updateDeal`
  const res = await axios.post(updateUrl, JSON.stringify(sendData))
  console.log(res, res.data)
  return res.data
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
