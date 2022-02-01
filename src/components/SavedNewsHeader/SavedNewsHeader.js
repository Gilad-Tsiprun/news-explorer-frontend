import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function SavedNewsHeader({ children, name, cardsCount, keyWordsText }) {

  return (
    <>
      {children}
      <div className="saved__container">
        <h3 className="saved__heading">Saved Articles</h3>
        <h2 className="saved__title">{`${name}, you have ${cardsCount} saved articles`}</h2>
        <p className="saved__keywords"><span className="saved__keywords saved__keywords_light">By keywords: </span>{keyWordsText}</p>
      </div>
    </>
  )
}

export default SavedNewsHeader;