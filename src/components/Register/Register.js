import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import "./Register.css";
import { EMAIL_PATTERN, LETTER_PATTERN } from "../../utils/constants";

function Register(props) {
  //добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их   управляемыми
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);

  function handleChangePassword(e) {
    const value = e.target.value;
    if ((value.length < 2) || (value.length > 30)) {
      setPasswordError("Измените пароль!");
      setIsValid(false);
    } else {
      setPasswordError("");
    }
    setPassword(value);
  }

  function handleChangeEmail(e) {
    const value = e.target.value;
    if (!EMAIL_PATTERN.test(value) && value.length > 0) {
      setEmailError("Неверный формат e-mail!");
      setIsValid(false);
    } else {
      setEmailError("");
    }
    setEmail(value);
  }

  function handleChangeName(e) {
    const value = e.target.value;
    if ((LETTER_PATTERN.test(value)) || (value.length < 2) || (value.length > 30)) {
      setNameError("Измените имя!");
      setIsValid(false);
    } else {
      setNameError("");
    }
    setName(value);
  }

  function checkValid() {
    if (!passwordError && !emailError && !nameError && password && email && name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  useEffect(() => {
    checkValid();
  }, [password, email, name]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onRegister({password, email, name});
  }

  return(
    <div className="register__form">
      <Link to="/" className='header__logo'><img src={headerLogo} alt="Логотип заголовка"></img></Link>
      <p className="login__welcome">Добро пожаловать!</p>
      <form onSubmit={handleSubmit}>
        
        <div className='login__text'>Имя</div>
        <input className={`login__input border__bottom-grey ${nameError ? "message__error" : ""}`} placeholder='Имя пользователя' value={name} onChange={handleChangeName}/>
        <p className="input-error">{nameError}</p>

        <div className='login__text'>Email</div>
        <input className={`login__input border__bottom-blue ${emailError ? "message__error" : ""}`} placeholder='email' value={email} onChange={handleChangeEmail}/>
        <p className="input-error">{emailError}</p>

        <div className='login__text-two'>Пароль</div>
        <input className={`login__input border__bottom-grey ${passwordError ? "message__error" : ""}`} placeholder='Пароль' value={password} onChange={handleChangePassword}/>
        <p className="input-error">{passwordError}</p>

        <div className='profile__text-error'>{props.profileErrorText}</div>

        <button type="submit" className={ !isValid ? (`${'register__link'} ${'register__link-passiv'}`) : ('register__link') } disabled={ !isValid }>Зарегистрироваться</button>
      </form>
      
      <div className="register__signin">
        <p className="register__login-question">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link-smoll">Войти</Link>
      </div>

    </div>
  )
}

export default Register;
