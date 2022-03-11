import axios from 'axios'

const baseUrl = `http://${window.location.hostname}:80/api/params/`

const getParams = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getParams }