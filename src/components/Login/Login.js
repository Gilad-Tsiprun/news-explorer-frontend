import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Login({ handleLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <PopupWithForm onClose={onClose} handleSubmit={handleSubmit}>
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
    </PopupWithForm>
  )

}

export default Login;