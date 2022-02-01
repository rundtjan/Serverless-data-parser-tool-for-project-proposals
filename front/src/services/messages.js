import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80 // eslint-disable-line
const channel = 'general'
const baseUrl = `http://${window.location.hostname}:${port}/api/data/${channel}`

const getAll = async(channel) => {
  const res = await axios.get(`${baseUrl}${channel}`)
  console.log(`${baseUrl}${channel}`)
  return res.data
}

export default { getAll }
