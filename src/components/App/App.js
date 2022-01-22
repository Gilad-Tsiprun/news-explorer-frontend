import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Navigation from '../Navigation/Navigation.js';
// import Preloader from '../Preloader/Preloader.js';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { newsCards } from '../../utils/data.js';
import './App.css';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [isSavedArticles, setIsSavedArticles] = useState(false);
  const { pathname } = useLocation();

  function isSaved() {
    return false;
  }

  function handleSearchClick(e) { //search for cards according to the value entered
    e.preventDefault();

    setIsSearched(true);
  }

  function handleClosePopup() {
    history.push('/home');
  }

  function handleLogout() {
    setIsLoggedIn(false);
    history.push('/home');
  }


  useEffect(() => {
    setIsSavedArticles(isLoggedIn && pathname === '/saved-news')
    setIsSearched(isSearched && pathname !== '/saved-news')
  }, [pathname, isLoggedIn, isSavedArticles, isSearched])

  const keyWordsText = 'Nature, Yellowstone, and 2 other';

  return (
    <>
      {isSavedArticles ?
        <SavedNews
          isSaved={isSaved}
          newsCards={newsCards}
          isSearched={isSearched}>
          <SavedNewsHeader keyWordsText={keyWordsText} cardsCount={newsCards.length} >
            <Header pathname={pathname} name='Gilad' isLoggedIn={isLoggedIn} isHome={false} logout={handleLogout} />
          </SavedNewsHeader>
        </SavedNews>
        :
        <>
          <Search onSearchClick={handleSearchClick}>
            <Header pathname={pathname} name='Gilad' isLoggedIn={isLoggedIn} isHome={true} logout={handleLogout} />
          </Search>

          <Main
            newsCards={newsCards}
            isSearched={isSearched}
            isLoggedIn={isLoggedIn}
            handleCardDelete={() => { }}
            handleCardSave={() => { }}
            handleCardClick={isSaved}
            isSaved={isSaved} />

          <About />
        </>}

      <Switch>
        <Route path="/login">
          <Login onClose={handleClosePopup} />
        </Route>
        <Route path="/register">
          <Register onClose={handleClosePopup} />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/nav">
          <Navigation onClose={handleClosePopup} logout={handleLogout} isLoggedIn={isLoggedIn} />
        </Route>

      </Switch>
      {/* <Route path="/home">
        <Main
          newsCards={newsCards}
          isSearched={isSearched}
          isLoggedIn={isLoggedIn}
          handleCardDelete={() => { }}
          handleCardSave={() => { }}
          handleCardClick={isSaved}
          isSaved={isSaved} />

      </Route> */}
      {/* <Preloader /> */}
      <Footer />
    </>
  );
}

export default App;
