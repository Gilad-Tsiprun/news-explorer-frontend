import React, { useState } from 'react';

function SearchForm({ handleSearchClick }) {
  const [searchText, setSearchText] = useState('');


  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <form className="search__form" name="search-form">
      <input
        className="search__input"
        type="text"
        placeholder="Enter a topic"
        required minLength={2}
        maxLength={50}
        onChange={handleSearchChange}
        value={searchText || ''} >
      </input>
      <button type="submit" className='search__button' onClick={handleSearchClick}>Search</button>
    </form>
  )
}

export default SearchForm;