import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import "./Register.css";

// function Register(props) {
function Register() {
  // //добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их   управляемыми
  // const [password, setPassword] = React.useState('');
  // const [email, setEmail] = React.useState('');

  // function handleChangePassword(e) {
  //   setPassword(e.target.value);
  // }

  // function handleChangeEmail(e) {
  //   setEmail(e.target.value);
  // }

  // function handleSubmit(e) {
  //   // Запрещаем браузеру переходить по адресу формы
  //   e.preventDefault();
  //   props.onRegister({password, email});
  // }

  return(
    <div className="register__form">
      <Link to="/" className='header__logo'><img src={headerLogo} alt="Логотип заголовка"></img></Link>
      <p className="login__welcome">Добро пожаловать!</p>
      {/* <form onSubmit={handleSubmit} className="register__form"></form> */}
      <form>
        
        <div className='login__text'>Имя</div>
        {/* <input className="login__input" id="email" name="email" type="email"  placeholder='Email' value={email} onChange={handleChangeEmail}/> */}
        <input className="login__input" id="email" name="email" type="email" placeholder='Виталий'/>
        
        <div className='login__text'>E-mail</div>
        {/* <input className="login__input" id="password" name="password" type="password" placeholder='Пароль' value={password} onChange={handleChangePassword}/> */}
        <input className="login__input" id="password" name="password" type="password" placeholder='pochta@yandex.ru'/>

        <div className='login__text'>Пароль</div>
        <input className="login__input" id="password" name="password" type="password" placeholder='************'/>
        <div className='login__text-error'>Что-то пошло не так...</div>

        <button type="submit" className="register__link">Зарегистрироваться</button>
      </form>
      
      <div className="register__signin">
        <p className="register__login-question">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link-smoll">Войти</Link>
      </div>

    </div>
  )
}

//10. см. выше
export default Register;