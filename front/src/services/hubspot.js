import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL // eslint-disable-line

const searchDeals = async(queryString) => {
  const sendData = { queryString: queryString }
  const searchUrl = `${baseUrl}?route=searchDeals`
  const res = await axios.post(searchUrl, JSON.stringify(sendData))
  return res.data
}
const updateDeal = async(properties, id) => {
  const sendData = { id: id, properties: properties }
  const updateUrl = `${baseUrl}?route=updateDeal`
  const res = await axios.post(updateUrl, JSON.stringify(sendData))
  return res.data
}

export default { searchDeals, updateDeal }

