import React from 'react';

function SearchForm({ searchText, handleSearchChange, handleSearchClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchClick(searchText);
  }

  const searchButtonClassDisabled = (
    !searchText ? 'search__button_disabled' : ''
  );

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
      <button type="submit" className={`search__button ${searchButtonClassDisabled}`} onClick={handleSubmit}>Search</button>
    </form>
  )
}

export default SearchForm;