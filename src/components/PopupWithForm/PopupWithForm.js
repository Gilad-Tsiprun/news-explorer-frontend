import { useLocation, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function PopupWithForm({ name, isOpen, onClose, children, onSubmit }) {
  const { pathname } = useLocation();
  const [linkTo, setLinkTo] = useState('/register');
  const [authText, setAuthText] = useState('Sign in');
  useEffect(() => {
    setLinkTo(pathname === '/register' ? '/login' : '/register')
    setAuthText(pathname === '/register' ? 'Sign up' : 'Sign in')
  }, [pathname, authText])

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape' || e.target.classList.contains('popup-box_opened')) {
        onClose();
      }
    }
    window.addEventListener('keydown', close)
    window.addEventListener('mousedown', close)
    return () => {
      window.removeEventListener('keydown', close);
      window.removeEventListener('mousedown', close);
    };
  }, [onClose])

  return (
    <section className={`popup-box popup-box_type_${name} popup-box_opened ${isOpen ? 'popup-box_opened' : ''}`}>
      <div className="popup-box__container">
        <button type="button" className="popup-box__action popup-box__action_btn_close opacity" onClick={onClose} />
        <h2 className="popup-box__title">{authText}</h2>
        <form className={`input input_${name}`} name={`element-form_${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup-box__action popup-box__action_btn_${name} popup-box__action_submit`}>
            {authText}
          </button>
        </form>
        <div className="auth__signup">
          <p className="auth__text-link">or  <Link to={linkTo} className="auth__link">
            {linkTo === '/login' ? 'Sign in' : 'Sign up'}
          </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm;