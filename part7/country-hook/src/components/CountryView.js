import { useEffect, useState } from 'react'
import WeatherService from '../services/weather'

const CountryView = ({ countryObject }) => {
    
    const [countryWeather, setCountryWeather] = useState(undefined)
    const api_key = process.env.REACT_APP_API_KEY
    const countryLat = countryObject.capitalInfo.latlng[0]
    const countryLng = countryObject.capitalInfo.latlng[1]
    
    useEffect(() => {
        WeatherService
            .getWeather(countryLat, countryLng, api_key)
            .then(data => {
                setCountryWeather(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1>{countryObject.name.common}</h1>
            <div>capital {countryObject.capital[0]}</div>
            <div>area {countryObject.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(countryObject.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countryObject.flags.png} alt={countryObject.flags.alt} />
            <h2>Weather in {countryObject.capital[0]}</h2>
            {countryWeather && (
                <>
                    <div>temperature {countryWeather.main.temp} Celsius</div>
                    <img src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`} alt='weather type' />
                    <div>wind {countryWeather.wind.speed} m/s</div>
                </>
            )}
        </div>
    )
}

export default CountryView