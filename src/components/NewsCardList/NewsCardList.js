import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard.js'

function NewsCardList({ newsCards, handleCardSave, handleCardDelete, handleCardClick, isSearched, isSaved, isLoggedIn, isShowMore }) {
  const [newsCardsToRender, setNewsCardsToRender] = useState([]);

  useEffect(() => {
    if (newsCards.length > 3 && isSearched && !isShowMore) {
      setNewsCardsToRender(newsCards.slice(0, 3));
    }

    else {
      setNewsCardsToRender(newsCards);
    }
  }, [newsCards, isSearched, isShowMore]);

  return (
    <ul className="cards__list">
      {isSearched ? newsCardsToRender.map((newsCard) => (
        <NewsCard
          key={newsCard._id}
          newsCard={newsCard}
          handleCardDelete={() => handleCardDelete(newsCard)}
          handleCardSave={() => handleCardSave(newsCard)}
          handleCardClick={() => handleCardClick(newsCard)}
          isSearched={isSearched}
          isSaved={isSaved}
          isLoggedIn={isLoggedIn} />
      ))
        : newsCards.map((newsCard) => (
          <NewsCard
            key={newsCard._id}
            newsCard={newsCard}
            handleCardDelete={() => handleCardDelete(newsCard)}
            handleCardSave={() => handleCardSave(newsCard)}
            handleCardClick={() => handleCardClick(newsCard)}
            isSearched={isSearched}
            isSaved={isSaved}
            isLoggedIn={isLoggedIn} />
        ))}
    </ul>
  )
}

export default NewsCardList;