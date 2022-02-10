import axios from 'axios'

const channelUrl = `http://${window.location.hostname}:80/api/channels/`

const getChannels = async() => {
  const res = await axios.get(channelUrl)
  return res.data
}

export default { getChannels }