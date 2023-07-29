import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const request = axios.get(`${baseURL}/all`)
    return request.then(response => response.data)
}

// const getByName = (countryName) => {
//     const request = axios.get(`${baseURL}/name/${countryName}`)
//     return request.then(response => response.data)
// }

export default { getAll }