import React from 'react';

function SearchForm({ searchText, handleSearchChange, handleSearchClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      handleSearchClick(searchText);
    }
  }

  const searchButtonClassDisabled = (
    !searchText ? 'search__button_disabled' : ''
  );

  return (
    <form className="search__form" name="search-form" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Enter a topic"
        required minLength={2}
        maxLength={50}
        onChange={handleSearchChange}
        value={searchText || ''} >
      </input>
      <button type="submit" className={`search__button ${searchButtonClassDisabled}`}>Search</button>
    </form>
  )
}

export default SearchForm;