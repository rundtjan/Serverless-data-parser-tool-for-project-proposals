import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT || 80 // eslint-disable-line
const baseUrl =  'http://135.181.37.120:80/api/parse/'

/**
 * Gets data from backend that matches the parameters given in slack with the parse command.
 * @param {String} id
 * @returns Data containing messages
 */
const getAll = async(id) => {
  const res = await axios.get(`${baseUrl}${id}`)
  return res.data
}

export default { getAll }