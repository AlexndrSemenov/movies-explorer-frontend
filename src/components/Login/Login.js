
import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import "./Login.css";

//1. Обратимся к компоненту Login
// function Login(props) {
function Login() {

  // const [password, setPassword] = React.useState('');
  // const [email, setEmail] = React.useState('');

  // function handleChangePassword(e) {
  //   setPassword(e.target.value);
  // }

  // function handleChangeEmail(e) {
  //   setEmail(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   props.handleLogin({password, email});
  // }

  return(
    <div className="register__form">
      
      <Link to="/" className='header__logo'><img src={headerLogo} alt="Логотип заголовка"></img></Link>
      <p className="login__welcome">Рады видеть!</p>
      {/* <form onSubmit={handleSubmit} className="register__form"> */}
      <form>
        
        <div className='login__text'>E-mail</div>
        {/* <input className="login__input" id="email" required name="email" type="text" value={email} onChange={handleChangeEmail} placeholder='Email' /> */}
        <input className="login__input" id="password" type="password" placeholder='pochta@yandex.ru'/>
          
        <div className='login__text'>Пароль</div>  
        {/* <input className="login__input" id="password" required name="password" type="password" value={password} onChange={handleChangePassword} placeholder='Пароль' /> */}
        <input className="login__input-last" id="password" type="password" placeholder='' />

        <button type="submit" className="register__link">Войти</button>
          
      </form>

      <div className="register__signin">
        <p className="register__login-question">Еще не зарегистрированы?</p>
        <Link to="/signup" className="register__login-link-smoll">Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;