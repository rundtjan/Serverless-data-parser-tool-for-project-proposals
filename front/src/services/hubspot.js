import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80 // eslint-disable-line
const baseUrl = `http://${window.location.hostname}:${port}/api/hubspot`

/**
 * Get all HubSpot deals from backend
 * - Used if we want to handle deals in frontend
 * - Could be removed if we want to use only the parameterized get
 */
const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

/**
 * Get all HubSpot deals from backend with a certain parameter
 * - e.g. All deals with certain name or customer
 * - Used if we want to handle deals mainly in backend
 * - /api/hubspot/eficode would return all deals associated with company named eficode
 */
const getAllWith = async(name) => {
  const res = await axios.get(`${baseUrl}/${name}`)
  return res.data
}

export default { getAll, getAllWith }