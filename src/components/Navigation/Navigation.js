import React from 'react';
import Header from '../Header/Header.js';

function Navigation({ handleRegisterOpen, onClose, logout, isLoggedIn, isOpen }) {

  return (
    <section className={`popup-box popup-box_type_nav ${isOpen ? 'popup-box_opened' : ''}`}>
      <div className="popup-box__container popup-box__container_type_nav">
        <button type="button" className="popup-box__action popup-box__action_btn_close popup-box_action_btn_close_nav opacity" onClick={onClose} />
        <Header handleRegisterOpen={handleRegisterOpen} onClose={onClose} name='Gilad' isLoggedIn={isLoggedIn} isHome={true} logout={logout} isNavBar={true} />
      </div>
    </section>
  )

}

export default Navigation;