import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ errorMessage, formName, name, handleLoginOpen, isOpen, handleRegister, onClose }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();


  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm])

  const closeRegister = () => {
    onClose();
  }

  const OpenLogin = () => {
    handleLoginOpen();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values.passwordRegister, values.emailRegister, values.username);
    resetForm();
  }

  return (
    <PopupWithForm errorMessage={errorMessage} isValid={isValid} formName={formName} name={name} handleOpenRegisterOrLogin={OpenLogin} isOpen={isOpen} onClose={closeRegister} handleSubmit={handleSubmit} >
      <div className="popup-box__input-container">
        <p className="popup-box__text popup-box__email">Email</p>
        <input id={`${formName}-email`} required name={`emailRegister`}
          type="email"
          className="input__text input__text_type_email"
          placeholder="Enter email"
          value={values.emailRegister || ''}
          onChange={handleChange}
        />
        <span className="input-error email-input-error"  >{errors.emailRegister}</span>
      </div>
      <div className="popup-box__input-container">
        <p className="popup-box__text popup-box__password">Password</p>
        <input id={`${formName}-password`} required name={`passwordRegister`}
          minLength={6}
          type="password"
          className="input__text input__text_type_password"
          placeholder="Enter password"
          value={values.passwordRegister || ''}
          onChange={handleChange}
        />
        <span className="input-error password-input-error"  >{errors.passwordRegister}</span>
      </div>
      <div className="popup-box__input-container">
        <p className="popup-box__text popup-box__username">username</p>
        <input id={`${formName}-username`} required name={`username`}
          minLength={2}
          type="username"
          value={values.username || ''}
          className="input__text input__text_type_username"
          placeholder="Enter username"
          onChange={handleChange}
        />
        <span className="input-error username-input-error"  >{errors.username}</span>
      </div>
    </PopupWithForm>
  )

}

export default Register;