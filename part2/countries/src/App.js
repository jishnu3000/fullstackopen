import { useEffect, useState } from 'react'
import CountriesList from "./components/CountriesList";
import SearchBar from "./components/SearchBar";
import CountryService from './services/restcountries'

function App() {
  const [countriesList, setCountriesList] = useState(undefined)
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    CountryService
      .getAll()
      .then((countries) => {
        setCountriesList([...countries])
        setCountriesToShow([...countries])
      })
      .catch(error => console.log(error))
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    const searchInput = event.target.value
    
    const filteredCountries = countriesList.filter(country => {
      const countryName = country.name.common
      return countryName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    })
    setCountriesToShow(filteredCountries)
    
    if (searchInput === '') {
      setCountriesToShow([...countriesList])
    }
  }

  const showCountry = (countryObj) => {
    setCountriesToShow([countryObj])
}

  return (
    <div>
      <SearchBar handleChange={handleSearch} />
      {!countriesList ? (
        <div>Waiting for server...</div>
      ) : (
        <CountriesList items={countriesToShow} showCountry={showCountry} />
      )}
    </div>
  )
}

export default App;
