import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';

function Search({ searchText, handleSearchChange, onSearchClick, children }) {

  return (
    <section className="search">
      {children}
      <div className="search__container">
        <h1 className="search__title">Whats going on in the world?</h1>
        <p className="search__subtitle">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm searchText={searchText} handleSearchChange={handleSearchChange} handleSearchClick={onSearchClick} />
      </div>
    </section>
  )
}

export default Search