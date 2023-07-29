import axios from 'axios'

const getWeather = (latitude, longitude, APIkey) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`)
    return request.then(response => response.data)
}

export default { getWeather }