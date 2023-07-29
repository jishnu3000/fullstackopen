import CountryView from "./CountryView"

const CountriesList = ({ items, showCountry }) => {
    
    if (items.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (items.length === 0) {
        return (
            <div>
                Zero matches, specify another filter
            </div>
        )
    } else if (items.length === 1) {
        return (
            <CountryView countryObject={items[0]} />
        )
    }

    return (
        items.map(item => {
            return (
                <div key={item.name.common}>
                    {item.name.common} <button onClick={() => showCountry(item)}>show</button>
                </div>
            )
        })
    )
}

export default CountriesList