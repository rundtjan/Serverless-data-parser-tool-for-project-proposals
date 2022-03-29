import axios from 'axios'

var baseUrl = `${process.env.REACT_APP_API_URL}?route=parseResult` // eslint-disable-line

const getAll = async(channel) => {
  const res = await axios.post(baseUrl, JSON.stringify({ channel }))
  console.log(res.data)
  return res.data
}

const getWithParameters = async(channel, user, hours) => {
  const res = await axios.post(baseUrl, JSON.stringify({ channel, user, hours }))
  return res.data
}

export default { getAll, getWithParameters }
