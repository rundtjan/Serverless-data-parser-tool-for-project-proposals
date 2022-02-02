import axios from 'axios'

const baseUrl = `http://${window.location.hostname}:80/api/data/`
const channelUrl = `http://${window.location.hostname}:80/api/channels/`

const sendParameters = async(channel, user, hours) => {
  console.log(channel, user, hours)
  const res = await axios.post(baseUrl, { channel, user, hours })
  return res.data
}

const getChannels = async() => {
  const res = await axios.get(channelUrl)
  return res.data
}

export default { sendParameters, getChannels }