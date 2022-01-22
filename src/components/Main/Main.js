// import React, { useContext } from 'react'
import React, { useState } from 'react'
//import avatar from '../images/profile-pic.jpg'
import NewsCardList from '../NewsCardList/NewsCardList.js';
// import SearchForm from '../SearchForm/SearchForm.js';

// import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

// In the Main component, add the userName, userDescription, and userAvatar state variables. Use them in JSX.
// Import the api module and add the effect that is called when the component is mounted, which will make a request to the API for user data. After receiving the response, set the received data in the corresponding state variables.
// Note. To substitute the avatar URL in the container, use the following code:

function Main({ isSaved, isSearched, isLoggedIn, onCardClick, newsCards, onCardSave, onCardDelete }) {
  const [isShowMore, setIsShowMore] = useState(false)

  function handleShowMore() {
    setIsShowMore(true)
  }

  return (
    <>
      {isSearched ? <main className="main">
        <section className="cards">
          <h2 className="cards__title">Search results</h2>
          <NewsCardList
            newsCards={newsCards}
            isLoggedIn={isLoggedIn}
            isSearched={isSearched}
            isSaved={() => isSaved()}
            isShowMore={isShowMore}
            handleCardSave={onCardSave}
            handleCardClick={onCardClick}
            handleCardDelete={onCardDelete} />

          <button type="button" className="cards__show-more" onClick={handleShowMore} >Show more</button>
        </section>

      </main> : ''}
    </>
  )
}

export default Main;