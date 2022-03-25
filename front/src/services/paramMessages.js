import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}?route=parseResult` // eslint-disable-line no-eval

/**
 * Gets data from backend that matches the parameters given in slack with the parse command.
 * @param {String} id
 * @returns Data containing messages
 */
const getAll = async(id) => {
  const res = await axios.post(`${baseUrl}`, id)
  return res.data
}

export default { getAll }
