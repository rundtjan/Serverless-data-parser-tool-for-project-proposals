import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}` // eslint-disable-line

const searchDeals = async(queryString) => {
  const searchUrl = `${baseUrl}?route=searchDeals`
  const sendData = { queryString: queryString }
  const res = await axios.post(searchUrl, JSON.stringify(sendData))

  return res.data.results
}
const updateDeal = async(/*properties, id*/) => {
  console.log('in updateDeal')
  const property = { amount: 5, dealname: 'Deal kauppisen muutettu maansiirtofirma oy ' }
  const id = 8319711901
  const sendData = { dealId: id, properties: property }
  console.log('sendData ' + JSON.stringify(sendData))
  const updateUrl = `${baseUrl}?route=updateDeal`
  const res = await axios.post(updateUrl, JSON.stringify(sendData))
  console.log('res ' + JSON.stringify(res))
  return res.data
}

updateDeal()

export default { searchDeals, updateDeal }

