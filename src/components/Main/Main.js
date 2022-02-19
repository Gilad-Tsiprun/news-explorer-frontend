import React from 'react'
import Preloader from '../Preloader/Preloader.js';
import NotFound from '../NotFound/NotFound.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
function Main({ handleLoginOpen, savedCards, errMessage, searchText, searchCardsCount, handleShowMore, isPreloading, isSearched, isLoggedIn, newsCards, handleCardDelete, handleCardSave }) {

  return (
    <>
      {isSearched ? <main className="main">
        <section className="cards">
          {!isPreloading && <>
            {newsCards && newsCards.length ?
              <>
                <h2 className="cards__title">Search results</h2>
                <NewsCardList
                  savedCards={savedCards}
                  searchText={searchText}
                  newsCards={newsCards}
                  isLoggedIn={isLoggedIn}
                  isSearched={isSearched}
                  isHome={true}
                  handleCardSave={handleCardSave}
                  handleCardClick={handleCardSave}
                  handleCardDelete={handleCardDelete}
                  searchCardsCount={searchCardsCount}
                  handleLoginOpen={handleLoginOpen} />
                {newsCards.length > searchCardsCount && <button type="button" className="cards__show-more" onClick={handleShowMore}>Show more</button>}
              </>
              : <NotFound errMessage={errMessage} />
            }

          </>}

          <Preloader isPreloading={isPreloading} />
        </section>
      </main>
        : ''}
    </>
  )
}

export default Main;