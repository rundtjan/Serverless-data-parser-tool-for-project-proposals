import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}` // eslint-disable-line

const searchDeals = async(queryString) => {
  const searchUrl = `${baseUrl}?route=searchDeals`
  const sendData = { queryString: queryString }
  const res = await axios.post(searchUrl, JSON.stringify(sendData))
  console.log(res)
  return res.data.results
}

export default { searchDeals }

