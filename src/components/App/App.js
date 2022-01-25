import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import * as auth from '../utils/auth.js'
// import InfoPopup from '../InfoPopup/InfoPopup.js';
import Navigation from '../Navigation/Navigation.js';
import { newsCards } from '../../utils/data.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import './App.css';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" })
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [isSavedArticles, setIsSavedArticles] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('jwt');

      if (token) {
        auth.checkToken(token)
          .then((res) => {
            setIsLoggedIn(true);
            history.push('/profile');
            // setEmail(res.email);
            // api.updateToken();

            // api.getUserInfo()
            //   .then((user) => {
            //     setCurrentUser(user)
            //   })
            //   .catch((err) => {
            //     console.log(err); // log the error to the console
            //   });
          })
          .catch((err) => console.log(err));
      }
    }

    checkSession();
  }, [history, isLoggedIn])

  // const handleRegister = (password, email) => {
  //   auth.register(password, email)
  //     .then((res) => {
  //       if (res) {
  //         setErrStatus(false);
  //         setInfoPopup(true);
  //       } else {
  //         const err = new Error('one of the fields was filled in incorrectly ');
  //         err.statusCode = 400;
  //         throw err;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setErrStatus(true);
  //       setInfoPopup(true);
  //     });
  // }

  // const handleLogin = (password, email) => {
  //   auth.authorize(password, email)
  //     .then((res) => {
  //       if (res) {
  //         setIsLoggedIn(true)

  //       } else {
  //         const err = new Error("Incorrect email address or password")
  //         err.statusCode = 401;
  //         throw err
  //       }
  //     })
  //     // .then((res) => res)
  //     .catch((err) => {
  //       console.log(err)
  //       setErrStatus(true);
  //       setInfoPopup(true);
  //     });
  // }

  const handleLogout = () => {
    history.push('/home');
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

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


  useEffect(() => {
    setIsSavedArticles(isLoggedIn && pathname === '/saved-news')
    setIsSearched(isSearched && pathname !== '/saved-news')
  }, [pathname, isLoggedIn, isSavedArticles, isSearched])

  const keyWordsText = 'Nature, Yellowstone, and 2 other';

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
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
            <Search onSearchClick={handleSearchClick} >
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
        {/* <InfoPopup onClose={handleClosePopup} /> */}
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
