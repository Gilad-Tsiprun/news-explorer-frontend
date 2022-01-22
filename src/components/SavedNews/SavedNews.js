// import React, { useContext } from 'react'
//import avatar from '../images/profile-pic.jpg'
import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';

// import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function SavedNews({ children, isSearched, isLoggedIn, onCardClick, newsCards, onNewsCardSave, onCardDelete, isSaved }) {

  return (
    <main className="saved">
      {children}
      {<section className="saved__articles">
        <NewsCardList
          newsCards={newsCards}
          isLoggedin={isLoggedIn}
          isSearched={isSearched}
          handleCardSave={onNewsCardSave}
          handleCardClick={onCardClick}
          handleCardDelete={onCardDelete}
          isShowMore={true}
          isSaved={isSaved} />
      </section>}
    </main>
  )
}

export default SavedNews;