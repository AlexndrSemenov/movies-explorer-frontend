import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Profile.css";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { EMAIL_PATTERN, LETTER_PATTERN } from "../../utils/constants";

function Profile(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);  

  //добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");  
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых   компонентах
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function checkValid() {
    if (
      !nameError && !emailError && name && email &&
      (name !== currentUser.name || email !== currentUser.email)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  useEffect(() => {
    checkValid();
  }, [name, email, currentUser]);

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

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.handleUpdateUser({ name: name, email: email });
  }

  return(
    <div className="profile__form">
      <div className="profile__title">
        <div>Привет,</div>
        {/* если данные не успеют загрузиться благодаря || ошибки не будет */}
        <div className="profile__title-name">{currentUser.name || 'Имя пользователя'}!</div>
      </div>
      <form onSubmit={handleSubmit}>

        <div className='profile__text'>
          <div>Имя</div>
          <input className='profile__text-name' value={ name || '' } onChange={handleChangeName} placeholder='Имя пользователя'/>
          
        </div>
        <p className="profile__input-error">{nameError}</p>

        <div className='profile__text'>
          <div>Email</div>
          <input className='profile__text-name' value={ email || '' } onChange={handleChangeEmail} placeholder='email'/>
          
        </div>
        <p className="profile__input-error-last">{emailError}</p>

        <div className='profile__text-error'>{props.profileErrorText}</div>

        <button className="profile__link" onClick={props.handleUpdateUser} disabled={ !isValid }>Редактировать</button>
        <Link to="/" type="submit" className="profile__link-quit" onClick={props.signOut}>Выйти из аккаунта</Link>
      </form>

    </div>
  )
}

export default Profile;
