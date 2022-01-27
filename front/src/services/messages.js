import axios from 'axios'

const channel = 'C02UNV80V7B'
const baseUrl = `http://${window.location.hostname}:8080/api/data/${channel}`

const getAll = async() => {
    const res = await axios.get(baseUrl)
    return res.data
}

export default { getAll }
