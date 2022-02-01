import axios from 'axios'

const baseUrl = `http://${window.location.hostname}:80/api/data/`

const sendParameters = async(channel, user, hours) => {
  const res = axios.post(baseUrl, channel, user, hours)
  return res.data
}
const getChannels = async() => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)

}
export default { sendParameters, getChannels }