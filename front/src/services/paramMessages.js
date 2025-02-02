import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}?route=parseResult` // eslint-disable-line

/**
 * Gets data from backend that matches the parameters given in slack with the parse command.
 * @param {String} id
 * @returns Data containing messages
 */
const getAll = async(id) => {
  console.log('id ', id)
  const res = await axios.post(`${baseUrl}`, id)
  console.log('res.data ', res.data)
  return res.data
}

export default { getAll }
