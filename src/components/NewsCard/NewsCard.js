import React, { useState } from 'react';

function NewsCard({ handleLoginOpen, isHome, searchText, newsCard, handleCardSave, handleCardDelete, isLoggedIn, savedCards }) {
  const [isLoggedInMessage, setIsLoggedInMessage] = useState(false);
  const [isRemoveMessage, setIsRemoveMessage] = useState(false);
  const [isSaveActive, setIsSaveActive] = useState(false);
  const [isSaveHover, setIsSaveHover] = useState(false);

  const isoDate = new Date(newsCard.publishedAt);
  const date = (
    `${isoDate.toLocaleString('default', { month: 'long' })} ${isoDate.getDate()}, ${isoDate.getFullYear()}`
  ); //formatting date according to figma

  const paragraph = newsCard.content.split('[')[0]; //content is cutoff with a [+xxxx characters], this cuts it of before the brackets

  const cardSaveButtonActiveClassname = (
    `${isSaveActive ? 'card__save_active' : ''}`
  );


  const cardSaveButtonHoverClassname = (
    `${isSaveHover ? 'card__save_hover' : ''}`
  );

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
    if (isLoggedIn) {
      if (!isSaveActive) {
        handleCardSave({
          keyword: searchText,
          title: newsCard.title,
          text: newsCard.content,
          date: newsCard.publishedAt,
          source: newsCard.source.name || newsCard.source.id,
          link: newsCard.url,
          image: newsCard.urlToImage,
        })
        setIsSaveActive(true);
      }
      else {
        const index = savedCards.map(card => card.title).indexOf(newsCard.title);
        handleCardDelete(savedCards[index]);
        setIsSaveActive(false);
      }
    }
    else {
      handleLoginOpen(true);
    }
  }

  function handleDeleteClick() {
    handleCardDelete(newsCard)
  }

  function handleSaveHover() {
    if (!isLoggedIn) {
      setIsLoggedInMessage(true);
    }

    if (!isSaveActive) {
      setIsSaveHover(true);
    }
  }

  function handleSaveLeave() {
    setIsLoggedInMessage(false);
    setIsSaveHover(false);
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
          className={`card__save ${cardSaveButtonActiveClassname} ${cardSaveButtonHoverClassname}`}
          onClick={handleSaveClick}
          onMouseEnter={handleSaveHover}
          onMouseLeave={handleSaveLeave} />
        {isLoggedInMessage && <button type="button" className={cardSignInClassName} >Sign in to save articles</button>}
      </>
    )
  }

  function handleCardClick() {
    window.open(newsCard.url, '_blank', 'noopener')
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
        {isHome
          ? <SearchedCardButtons />
          : <SavedCardButtons />
        }
      </div>
    )
  }


  return (
    <li className="card">
      <button className="card__button" >
        <img className="card__image" src={newsCard.urlToImage} alt={newsCard.keyword} onClick={handleCardClick} />
      </button>
      <div className="card__text-container">
        <p className="card__date">{date}</p>
        <h2 className="card__title card__text">{newsCard.title}</h2>
        <p className="card__text card__paragraph">{paragraph}</p>
        <p className="card__text card__source">{'' || `${newsCard.source.name.toUpperCase()}`}</p>
      </div>
      <CardButtons />
    </li>
  )
}

export default NewsCard;