const SearchBar = ({handleChange}) => {
    return (
        <div>
            find countries <input onChange={handleChange} />
        </div>
    )
}

export default SearchBar