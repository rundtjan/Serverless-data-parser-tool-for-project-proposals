import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80 // eslint-disable-line
const baseUrl = `http://${window.location.hostname}:${port}/api/data/`

const getAll = async(channel) => {
  const res = await axios.get(`${baseUrl}${channel}`)
  return res.data
}

export default { getAll }
