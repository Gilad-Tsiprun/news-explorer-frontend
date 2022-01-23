import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Register({ handleRegister, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(password, email);
    setEmail('');
    setPassword('');
    setUsername('');
  }

  return (
    <PopupWithForm onClose={onClose} handleSubmit={handleSubmit} >
      <p className="popup-box__text popup-box__email">Email</p>
      <input id="email" required name="email"
        type="text" value={email}
        className="input__text input__text_type_email"
        placeholder="Enter email"
        onChange={e => setEmail(e.target.value)}
      />
      <span className="input-error email-input-error" />
      <p className="popup-box__text popup-box__password">Password</p>
      <input id="password" required name="password"
        type="password" value={password}
        className="input__text input__text_type_password"
        placeholder="Enter password"
        onChange={e => setPassword(e.target.value)}
      />
      <span className="input-error password-input-error" />
      <p className="popup-box__text popup-box__username">username</p>
      <input id="username" required name="username"
        type="username" value={username}
        className="input__text input__text_type_username"
        placeholder="Enter username"
        onChange={e => setUsername(e.target.value)}
      />
      <span className="input-error username-input-error" />
    </PopupWithForm>
  )

}

export default Register;