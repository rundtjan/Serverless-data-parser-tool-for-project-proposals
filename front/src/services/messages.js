import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80 // eslint-disable-line
const baseUrl = `http://${window.location.hostname}:${port}/api/data/`

const getAll = async(channel) => {
  const res = await axios.get(`${baseUrl}${channel}`)
  console.log(res.data)
  return res.data
}

const getWithParameters = async(channel, user, hours) => {
  const res = await axios.post(baseUrl, { channel, user, hours })
  return res.data
}

export default { getAll, getWithParameters }
