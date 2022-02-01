import { Link } from 'react-router-dom'
import React, { useEffect } from 'react';

function PopupWithForm({ errorMessage, isValid, formName, handleOpenRegisterOrLogin, name, isOpen, onClose, children, handleSubmit }) {
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


  const submitClassDisabled = (
    !isValid ? 'popup-box__action_submit_disabled' : ''
  );

  return (
    <section className={`popup-box ${isOpen ? 'popup-box_opened' : ''}`}>
      <div className="popup-box__container">
        <button type="button" className="popup-box__action popup-box__action_btn_close opacity" onClick={onClose} />
        <h2 className="popup-box__title">{name}</h2>
        <form className={`input`} name={`${formName}-form`} onSubmit={handleSubmit}>
          {children}
          <div className="popup-box__submit-container">
            <span className="input-error input-error_submit submit-input-error"  >{errorMessage}</span>
            <button type="submit" className={`popup-box__action popup-box__action_submit ${submitClassDisabled}`}>
              {name}
            </button>
          </div>
        </form>
        <div className="popup-box__signup">
          <p className="popup-box__text-link">or  <Link to='/' onClick={handleOpenRegisterOrLogin} className="popup-box__link">
            {name === 'Sign up' ? 'Sign in' : 'Sign up'}
          </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm;