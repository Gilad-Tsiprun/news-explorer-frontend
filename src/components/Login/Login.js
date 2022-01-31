import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormValidation from "../FormValidation/FormValidation";

function Login({ errorMessage, formName, name, handleRegisterOpen, isOpen, handleLogin, onClose }) {
  const { values, handleChange, errors, isValid, resetForm } = FormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.passwordLogin, values.emailLogin);
  }

  const closeLogin = () => {
    resetForm();
    onClose();
  }

  const OpenRegister = () => {
    resetForm();
    handleRegisterOpen();
  }


  return (
    <PopupWithForm errorMessage={errorMessage} isValid={isValid} formName={formName} name={name} handleOpenRegisterOrLogin={OpenRegister} isOpen={isOpen} onClose={closeLogin} handleSubmit={handleSubmit}>
      <div className="popup-box__input-container">
        <p className="popup-box__text popup-box__email">Email</p>
        <input id={`${formName}-email`} required name={`emailLogin`}
          type="email"
          className="input__text input__text_type_email"
          placeholder="Enter email"
          value={values.emailLogin || ''}
          onChange={handleChange}
        />
        <span className="input-error email-input-error" >{errors.emailLogin}</span>
      </div>
      <div className="popup-box__input-container">
        <p className="popup-box__text popup-box__password">Password</p>
        <input id={`${formName}-password`} required name={`passwordLogin`}
          type="password"
          className="input__text input__text_type_password"
          placeholder="Enter password"
          value={values.passwordLogin || ''}
          onChange={handleChange}
        />
        <span className="input-error password-input-error" >{errors.passwordLogin}</span>
      </div>
    </PopupWithForm>
  )

}

export default Login;