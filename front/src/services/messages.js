import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80
const channel = 'general'
const baseUrl = `http://${window.location.hostname}:${port}/api/data/${channel}`

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getAll }
