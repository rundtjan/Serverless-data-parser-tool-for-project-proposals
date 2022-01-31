import axios from 'axios'

const channel = 'general'
const baseUrl = `http://${window.location.hostname}:80/api/data/${channel}`

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getAll }
