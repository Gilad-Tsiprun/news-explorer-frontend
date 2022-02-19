import React from 'react';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Main from '../Main/Main.js';
import About from '../About/About.js';



function Home({
    handleLoginOpen,
    handleCardDelete,
    searchText,
    handleSearchChange,
    searchCardsCount,
    handleShowMore,
    name,
    handleRegisterOpen,
    isPreloading,
    onClose,
    logout,
    pathname,
    onSearchClick,
    isSearched,
    isLoggedIn,
    newsCards,
    isSaved,
    handleNavOpen,
    handleCardSave,
    errMessage,
    savedCards
}) {

    return (
        <>
            <Search onSearchClick={onSearchClick} searchText={searchText} handleSearchChange={handleSearchChange} >
                <Header handleRegisterOpen={handleRegisterOpen} onClose={onClose} pathname={pathname} name={name} isLoggedIn={isLoggedIn} isHome={true} logout={logout} handleNavOpen={handleNavOpen} />
            </Search>

            <Main
                handleLoginOpen={handleLoginOpen}
                savedCards={savedCards}
                searchText={searchText}
                searchCardsCount={searchCardsCount}
                handleShowMore={handleShowMore}
                newsCards={newsCards}
                isSearched={isSearched}
                isLoggedIn={isLoggedIn}
                isPreloading={isPreloading}
                handleCardDelete={handleCardDelete}
                handleCardSave={handleCardSave}
                handleCardClick={isSaved}
                isSaved={isSaved}
                errMessage={errMessage} />

            <About />
        </>
    )
}

export default Home;