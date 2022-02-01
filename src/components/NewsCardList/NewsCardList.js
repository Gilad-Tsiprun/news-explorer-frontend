import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard.js'

function NewsCardList({ isHome, searchText, searchCardsCount, newsCards, handleCardSave, handleCardDelete, handleCardClick, isSearched, isLoggedIn, isShowMore, savedCards }) {
  const [newsCardsToRender, setNewsCardsToRender] = useState([]);

  useEffect(() => {
    if (newsCards.length > searchCardsCount && isSearched && !isShowMore) {
      setNewsCardsToRender(newsCards.slice(0, searchCardsCount));
    }

    else {
      setNewsCardsToRender(newsCards);
    }
  }, [newsCards, isSearched, isShowMore, searchCardsCount]);

  return (
    <ul className="cards__list">
      {isSearched ? newsCardsToRender.map((newsCard, index) => (
        <NewsCard
          searchText={searchText}
          key={index}
          newsCard={newsCard}
          handleCardDelete={handleCardDelete}
          handleCardSave={handleCardSave}
          handleCardClick={() => handleCardClick(newsCard)}
          isSearched={isSearched}
          isLoggedIn={isLoggedIn}
          isHome={isHome}
          savedCards={savedCards} />
      ))
        : newsCards.map((newsCard) => (
          <NewsCard
            key={newsCard._id}
            newsCard={newsCard}
            handleCardDelete={handleCardDelete}
            handleCardSave={() => { }}
            handleCardClick={() => handleCardClick(newsCard)}
            isSearched={isSearched}
            isLoggedIn={isLoggedIn} />
        ))}
    </ul>
  )
}

export default NewsCardList;