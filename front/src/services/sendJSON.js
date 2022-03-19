import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80 // eslint-disable-line
const baseUrl = `http://${window.location.hostname}:${port}/api/sendJSON/`

const sendJSON = async(assignedWords) => {
  const JSON = JSONfromAssignedWords(assignedWords)
  console.log('JSON ' + JSON.word)
  const res = await axios.post(`${baseUrl}`, JSON)
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

export default { sendJSON }
