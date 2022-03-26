import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}?route=searchDeals` // eslint-disable-line

const searchDeals = async(queryString) => {
  const sendData = { queryString: queryString }
  const res = await axios.post(baseUrl, JSON.stringify(sendData))
  return res.data
}

export default { searchDeals }