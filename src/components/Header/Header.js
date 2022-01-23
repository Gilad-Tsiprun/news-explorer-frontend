import React, { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import menu from '../../images/menu.png';
import menuDark from '../../images/menu_dark.png';
import logoutDark from '../../images/logout_dark.png';
import logoutLight from '../../images/logout_light.png';



function Header({ name, logout, isLoggedIn, isHome, pathname, isNavBar }) {

  const headerDarkText = (
    `${!isHome ? 'header__text_dark' : ''}`
  );

  const headerDark = (
    `${!isHome ? 'header_dark' : ''}`
  );

  const headerLogoutDark = (
    `${!isHome ? 'header__logout_dark' : ''}`
  );

  const headerNavBar = (
    `${isNavBar ? 'header_type_navbar' : ''}`
  )

  const headerTitleNav = (
    `${isNavBar ? 'header__title_type_navbar' : ''}`
  )

  const headerMenuDisabled = (
    `${isNavBar ? 'header__menu_disabled' : ''}`
  )

  const headerNavBarDisabled = (
    `${!isNavBar ? 'header__navbar_disabled' : ''}`
  )

  const [savedArticlesActive, setSavedArticlesActive] = useState(false);
  const [homeActive, setHomeActive] = useState(false);

  useEffect(() => {
    setSavedArticlesActive(pathname === '/saved-news' && !isNavBar ? 'header__saved-articles_active' : '')
    setHomeActive(pathname !== '/saved-news' && !isNavBar ? 'header__home_active' : '')
  }, [pathname, isNavBar])

  return (
    <header className={`header ${headerDark} ${headerNavBar}`}>
      <h2 className={`header__text header__title ${headerTitleNav} ${headerDarkText}`}>
        NewsExplorer <span className={`header__menu ${headerMenuDisabled}`}><Link to="/nav"><img src={isHome ? menu : menuDark} alt='menu' /></Link></span>
      </h2>
      <nav className={`header__navbar ${headerNavBarDisabled}`}>
        <Link to="/" className={`header__text header__home header__navbar-item ${homeActive} ${headerDarkText} link`}>Home</Link>
        {isLoggedIn
          ?
          <>
            <Link to="/saved-news" className={`header__text header__navbar-item header__saved-articles ${savedArticlesActive} ${headerDarkText} link`}>Saved articles</Link>
            <Link to="/"
              onClick={logout}
              className={`header__text header__navbar-item header__logout ${headerLogoutDark} ${headerDarkText} link`}>{name} <span className="header__logout_image"><img src={isHome ? logoutLight : logoutDark} alt="logout" />
              </span>
            </Link>
          </>
          :
          <Link to="/login" className={`header__text header__login ${headerDarkText} link`}>Sign in</Link>}
      </nav>
    </header>
  )
}

export default Header;