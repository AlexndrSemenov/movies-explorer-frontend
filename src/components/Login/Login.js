import React from 'react';
import { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import "./Login.css";
import { EMAIL_PATTERN } from "../../utils/constants";

function Login(props) {

  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [passwordError, setPasswordError] = useState("");
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

  function checkValid() {
    if (!passwordError && !emailError && password && email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  useEffect(() => {
    checkValid();
  }, [password, email]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.handleLogin({password, email});
  }

  return(
    !props.loggedIn ?
    (<div className="register__form">
      
      <Link to="/" className='header__logo'><img src={headerLogo} alt="Логотип заголовка"></img></Link>
      <p className="login__welcome">Рады видеть!</p>
      <form onSubmit={handleSubmit}>
        
        <div className='login__text'>Email</div>
        <input className={`login__input border__bottom-grey ${emailError ? "message__error" : ""}`} placeholder='Email' value={email} onChange={handleChangeEmail} disabled={props.isInvisible} />
        <p className="input-error">{emailError}</p>

        <div className='login__text'>Пароль</div>  
        <input className={`login__input-last border__bottom-grey ${passwordError ? "message__error" : ""}`} placeholder='Пароль' value={password} onChange={handleChangePassword} disabled={props.isInvisible} />
        <p className="input-error-two">{passwordError}</p>

        <div className='profile__text-error'>{props.profileErrorText}</div>
        
        <button type="submit" disabled={ !isValid || props.isInvisible } className={
          (!isValid || props.isInvisible) ?
          (`${'register__link'} ${'register__link-passiv'}`) :
          ('register__link') 
          } >Войти</button>
          
      </form>

      <div className="register__signin">
        <p className="register__login-question">Еще не зарегистрированы?</p>
        <Link to="/signup" className="register__login-link-smoll">Регистрация</Link>
      </div>
    </div>)
    :
    <Redirect to="/" />
  )
}

export default Login;
