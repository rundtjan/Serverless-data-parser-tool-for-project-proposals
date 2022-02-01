import axios from 'axios'

const baseUrl = `http://${window.location.hostname}:80/api/data/`

const getAll = async(channel) => {
  const res = await axios.get(`${baseUrl}${channel}`)
  console.log(`${baseUrl}${channel}`)
  return res.data
}

export default { getAll }
