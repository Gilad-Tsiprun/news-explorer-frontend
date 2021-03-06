import React, { Link } from 'react-router-dom';
import githubImage from '../../images/github.png';
import stackOverflowImage from '../../images/stackoverflow.png';

function Footer() {

  return (
    <footer className="footer">
      <p className="footer__copyright">© {new Date().getFullYear()} Supersite, Powered by News API</p>
      <nav className="footer__navbar">
        <div className="footer__link-container">
          <Link to="/" className="footer__text footer__home link">Home</Link>
          <a href="https://practicum.yandex.com/" className="footer__text footer__yandex link" target="_blank" rel="noopener noreferrer">Practicum by Yandex</a>
        </div>
        <a href="https://github.com/Phoenix801" className="link" target="_blank" rel="noopener noreferrer"><img src={githubImage} className="footer__github" alt="github profile" /></a>
        <a href="https://stackoverflow.com/users/6365408/gilad" className="link" target="_blank" rel="noopener noreferrer"><img src={stackOverflowImage} className="footer__stackoverflow" alt="stack overflow profile" /></a>
      </nav>
    </footer>
  )
}

export default Footer;