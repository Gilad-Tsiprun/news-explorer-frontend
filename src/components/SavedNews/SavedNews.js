// import React, { useContext } from 'react'
import React from 'react'
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
import NewsCardList from '../NewsCardList/NewsCardList.js';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';


function SavedNews({ name, onClose, logout, pathname, keyWordsText, isSearched, isLoggedIn, onCardClick, newsCards, onNewsCardSave, handleCardDelete, handleNavOpen }) {


  return (
    <main className="saved">

      <SavedNewsHeader name={name} keyWordsText={keyWordsText} cardsCount={newsCards.length} >
        <Header onClose={onClose} pathname={pathname} name={name} isLoggedIn={isLoggedIn} isHome={false} logout={logout} handleNavOpen={handleNavOpen} />
      </SavedNewsHeader>
      {<section className="saved__articles">
        <NewsCardList
          newsCards={newsCards}
          isLoggedin={isLoggedIn}
          isSearched={isSearched}
          handleCardSave={onNewsCardSave}
          handleCardClick={onCardClick}
          handleCardDelete={handleCardDelete}
          isShowMore={true} />
      </section>}
    </main>
  )
}

export default SavedNews;