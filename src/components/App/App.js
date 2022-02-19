import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import Home from '../Home/Home.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js'
import * as MainApi from '../../utils/MainApi.js';
import * as NewsApi from '../../utils/NewsApi.js';
import InfoPopup from '../InfoPopup/InfoPopup.js';
import Navigation from '../Navigation/Navigation.js';
import { newsCards } from '../../utils/data.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const searchedCardsCountInRow = 3;

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" })
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchedNews, setSearchedNews] = useState([]);
  const [savedNewsCards, setSavedNewsCards] = useState([]);
  const [searchCardsCount, setSearchCardsCount] = useState(searchedCardsCountInRow);
  const [searchText, setSearchText] = useState('');
  const [keyWordsText, setKeyWordsText] = useState('');
  const [searchErrMessage, setSearchErrorMessage] = useState('');
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');


  const { pathname } = useLocation();

  useEffect(() => { //check token and retrieve user + saved cards info from api
    const checkSession = () => {
      const token = localStorage.getItem('jwt');

      if (token) {
        MainApi.checkToken(token)
          .then((res) => {
            setIsLoggedIn(true);

            MainApi.getUserInfo()
              .then((user) => {
                setCurrentUser(user)
              })
              .catch((err) => {
                console.log(err); // log the error to the console
              });

            MainApi.getSavedCards()
              .then((res) => {
                setSavedNewsCards(res.data.map((article) => turnArticleToNewsCard(article)))
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }

    checkSession();
  }, [history, isLoggedIn])


  useEffect(() => { //source for sorting unique values by popularity: https://stackoverflow.com/a/22011372/6365408

    const map = savedNewsCards.map(articles => articles.keyword).reduce(function (p, c) {
      p[c] = (p[c] || 0) + 1;
      return p;
    }, {});

    const uniqueKeyWords = Object.keys(map).sort(function (a, b) {
      return map[b] - map[a];
    });

    if (uniqueKeyWords.length > 3) {
      setKeyWordsText(`${uniqueKeyWords[0]}, ${uniqueKeyWords[1]}, and ${uniqueKeyWords.length - 2} others`)
    }
    else if (uniqueKeyWords.length === 3) {
      setKeyWordsText(`${uniqueKeyWords[0]}, ${uniqueKeyWords[1]} and ${uniqueKeyWords[2]}`);
    }
    else if (uniqueKeyWords.length === 2) {
      setKeyWordsText(`${uniqueKeyWords[0]} and ${uniqueKeyWords[1]}`);
    }
    else if (uniqueKeyWords.length === 1) {
      setKeyWordsText(`${uniqueKeyWords[0]}`);
    }
  }, [savedNewsCards])

  useEffect(() => {
    setIsSearched(false);

    const initialSearchedCards = JSON.parse(localStorage.getItem('cards') || '[]'); //last news searched
    const initialSearchTerm = localStorage.getItem('keyword'); //last search term

    if (initialSearchTerm) {
      setSearchText(initialSearchTerm);
    }

    if (initialSearchedCards !== [] && initialSearchTerm) {
      setSearchCardsCount(searchedCardsCountInRow);
      setSearchedNews(initialSearchedCards);
      setIsSearched(true);
    }
  }, [isSearched])

  function turnArticleToNewsCard(article) { //fetched saved article objects don't match fetched news api objects
    return {
      keyword: article.keyword,
      title: article.title,
      content: article.text,
      publishedAt: article.date,
      source: {
        name: article.source
      },
      url: article.link,
      urlToImage: article.image,
      _id: article._id,
    }
  }

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  const handleSearchClick = (query) => { //search for cards according to the value entered
    setIsPreloading(true);
    setIsSearched(true);
    if (query) {
      NewsApi.searchArticles(query)
        .then((res) => {
          localStorage.setItem('cards', JSON.stringify(res.articles)); //save last searched cards in localStorage
          localStorage.setItem('keyword', searchText); //save last search term in localStorage
          setSearchCardsCount(searchedCardsCountInRow); //3 cards
          setSearchedNews(res.articles); //setting array of cards to pass it as a prop to home -> main -> cardlist
          setSearchErrorMessage('');
        })
        .catch((err) => {
          setSearchErrorMessage(err.message) //pass error message to not found page.
        })
        .finally(() => {
          setIsPreloading(false)
        });
    }
  }

  const handleRegister = (password, email, name) => {
    const registerErrMessage = 'one of the inputs was filled in incorrectly '
    MainApi.register(password, email, name)
      .then((res) => {
        if (res) {
          handleClosePopup();
          setIsInfoPopupOpen(true);
          setSubmitErrorMessage('');
        } else {
          const errMessage = registerErrMessage;
          const err = new Error(errMessage);
          setSubmitErrorMessage(errMessage)
          err.status = 400;
          throw err;
        }
      })
      .catch((err) => {
        if (err.status === 409) { //conflict, duplicate email
          setSubmitErrorMessage('This email is not available')
        } else {
          setSubmitErrorMessage(registerErrMessage)
        }
      });
  }

  const handleLogin = (password, email) => {
    const loginErrMessage = "Incorrect email address or password";
    MainApi.authorize(password, email)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          localStorage.setItem("isLogged", isLoggedIn);
          handleClosePopup();
          setSubmitErrorMessage('');
        } else {
          const err = new Error(loginErrMessage)
          err.status = 401;
          throw err
        }
      })
      // .then((res) => res)
      .catch((err) => {
        setSubmitErrorMessage(loginErrMessage)
      });
  }

  function handleCardSave(card) {
    MainApi.saveCard(card)
      .then(res => {
        setSavedNewsCards([turnArticleToNewsCard(res.data), ...savedNewsCards])
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  function handleCardDelete(card) {
    MainApi.deleteCard(card._id)
      .then(() => {
        setSavedNewsCards(savedNewsCards.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }



  const handleLoginOpen = () => {
    handleClosePopup();
    setIsLoginOpen(true);
  }

  const handleRegisterOpen = () => {
    handleClosePopup();
    setIsRegisterOpen(true);
  }

  const handleNavOpen = () => {
    setIsNavOpen(true);
  }

  const handleInfoOpen = () => {
    handleClosePopup();
    setIsInfoPopupOpen(true);
  }

  const handleClosePopup = () => {
    setSubmitErrorMessage('');
    setIsNavOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsInfoPopupOpen(false);
  }

  const handleLogout = () => {
    history.push('/home');
    localStorage.removeItem("jwt");
    localStorage.removeItem("isLogged");
    handleClosePopup();
    setIsLoggedIn(false);
  }

  function handleShowMore() {
    setSearchCardsCount(searchCardsCount + searchedCardsCountInRow); //adding 3 cards each time show more is pressed
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/home" >
          <Home
            handleLoginOpen={handleLoginOpen}
            savedCards={savedNewsCards}
            searchText={searchText}
            handleSearchChange={handleSearchChange}
            searchCardsCount={searchCardsCount}
            handleShowMore={handleShowMore}
            handleRegisterOpen={handleRegisterOpen}
            isPreloading={isPreloading}
            onSearchClick={handleSearchClick}
            pathname={pathname}
            name={currentUser.name}
            isLoggedIn={isLoggedIn}
            isHome={pathname !== '/saved-'}
            logout={handleLogout}
            newsCards={searchedNews}
            isSearched={isSearched}
            handleCardDelete={handleCardDelete}
            handleCardSave={handleCardSave}
            handleNavOpen={handleNavOpen}
            onClose={handleClosePopup}
            errMessage={searchErrMessage} />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <ProtectedRoute path='/saved-news' handleLoginOpen={handleLoginOpen}>
          <SavedNews
            newsCards={savedNewsCards}
            isSearched={isSearched}
            pathname={pathname}
            name={currentUser.name}
            isLoggedIn={isLoggedIn}
            isHome={pathname !== '/saved-news'}
            logout={handleLogout}
            keyWordsText={keyWordsText}
            cardsCount={newsCards.length}
            handleNavOpen={handleNavOpen}
            handleCardDelete={handleCardDelete}
            onClose={handleClosePopup}>
          </SavedNews>
        </ProtectedRoute>
      </Switch>
      <Footer />

      <Register
        formName='register'
        handleRegister={handleRegister}
        handleInfoOpen={handleInfoOpen}
        name='Sign up'
        handleLoginOpen={handleLoginOpen}
        isOpen={isRegisterOpen}
        onClose={handleClosePopup}
        errorMessage={submitErrorMessage} />

      <Login
        formName='login'
        handleLogin={handleLogin}
        name='Sign in'
        handleRegisterOpen={handleRegisterOpen}
        isOpen={isLoginOpen}
        onClose={handleClosePopup}
        errorMessage={submitErrorMessage} />

      <InfoPopup handleLoginOpen={handleLoginOpen} onClose={handleClosePopup} isOpen={isInfoPopupOpen} />

      <Navigation
        handleRegisterOpen={handleRegisterOpen}
        isOpen={isNavOpen}
        onClose={handleClosePopup}
        logout={handleLogout}
        isLoggedIn={isLoggedIn}
        name={currentUser.name} />
    </CurrentUserContext.Provider>
  );
}

export default App;
