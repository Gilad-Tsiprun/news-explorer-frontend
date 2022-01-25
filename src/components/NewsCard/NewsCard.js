import React, { useState } from 'react';

function NewsCard({ isSearched, newsCard, handleCardClick, handleCardSave, isSaved, handleCardDelete, isLoggedIn }) {
  const [isLoggedInMessage, setIsLoggedInMessage] = useState(false);
  const [isRemoveMessage, setIsRemoveMessage] = useState(false);

  const cardSaveButtonClassName = (`${isSaved() && isSearched ? 'card__save_active' : ''}`)

  const cardDeleteButtonClassName = (
    `${'card__remove'}`
  );

  const cardRemoveClassName = (
    `${'card__remove-text'}`
  );

  const cardKeyWordClassName = (
    `${'card__keyword'}`
  );

  const cardSignInClassName = (
    `${'card__login'}`
  );

  function handleSaveClick() {
    handleCardSave(newsCard)
  }

  function handleClick() {
    handleCardClick(newsCard);
  }

  function handleDeleteClick() {
    handleCardDelete(newsCard)
  }

  function handleSaveHover() {
    if (!isLoggedIn) {
      setIsLoggedInMessage(true);
    }
  }

  function handleSaveLeave() {
    setIsLoggedInMessage(false);
  }

  function handleRemoveHover() {
    setIsRemoveMessage(true);
  }

  function handleRemoveLeave() {
    setIsRemoveMessage(false);
  }

  function SearchedCardButtons() {
    return (
      <>
        <button type="button"
          className={`card__save ${cardSaveButtonClassName}`}
          onClick={handleSaveClick}
          onMouseEnter={handleSaveHover}
          onMouseLeave={handleSaveLeave} />
        {isLoggedInMessage && <button type="button" className={cardSignInClassName} >Sign in to save articles</button>}
      </>
    )
  }

  function SavedCardButtons() {
    return (
      <>
        <button type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          onMouseEnter={handleRemoveHover}
          onMouseLeave={handleRemoveLeave} />
        <button type="button" className={cardKeyWordClassName}>{newsCard.keyword}</button>
        {isRemoveMessage && <button type="button" className={cardRemoveClassName}>Remove from saved</button>}
      </>
    )
  }

  function CardButtons() {
    return (
      <div className="card__button-container">
        {isSearched
          ? <SearchedCardButtons />
          : <SavedCardButtons />
        }
      </div>
    )
  }


  return (
    <li className="card">
      <button className="card__button" onClick={handleClick}>
        <img className="card__image" src={newsCard.image} alt={newsCard.keyword} />
      </button>
      <div className="card__text-container">
        <p className="card__date">{newsCard.date}</p>
        <h2 className="card__title card__text">{newsCard.title}</h2>
        <p className="card__text card__paragraph">{newsCard.text}</p>
        <p className="card__text card__source">{newsCard.source}</p>
      </div>
      <CardButtons />
    </li>
  )
}

export default NewsCard;