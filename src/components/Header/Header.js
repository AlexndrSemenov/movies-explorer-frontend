import React from 'react';
import { useState, useEffect } from 'react';
import "./Header.css";
import headerLogo from '../../images/header-logo.svg';
import headerAccount from '../../images/account.svg';
import headerButtonMenu from '../../images/header-buttonMenu.svg';
// import Navigation from "../Navigation/Navigation";


function Header(props) {
  
  // показываем или скрываем меню навигации
  const [navigationMenu, setNavigationStatus] = useState(false);
  function changeNavigationStatus() {
    setNavigationStatus(true);
  }
  function changeNavigationStatusFalse() {
    setNavigationStatus(false);
  }

  return (
    <section className={ props.location==='/' ? (`${'header'} ${'header__dark'}`) : ('header') }>
      
      <a href="/" className='header__logo'><img src={headerLogo} alt="Логотип заголовка"></img></a>

      {props.loggedIn ? (

        <>
          <div className='header__wrapperMovies'>
            <a href="/movies" className={ props.location==='/' ? (`${'header__movies'} ${'header__font-light'}`) : ('header__movies') } >Фильмы</a>
            <a href="/saved-movies" className={ props.location==='/' ? (`${'header__saveMovies'} ${'header__font-light'}`) : ('header__saveMovies') } >Сохраненные фильмы</a>
          </div>
          <a href="/profile" className='header__wrapperAccount'>
            <div className='header__accountImage'><img src={headerAccount} alt="Аккаунт"></img></div>
            <div className='header__accountText'>Аккаунт</div>
          </a>
          <button className={ props.location==='/' ? (`${'header__buttomMenu'} ${'header__buttomMenu-dark'}`) : ('header__buttomMenu') } onClick={changeNavigationStatus}>
            <img src={headerButtonMenu} alt="Аккаунт"></img>
          </button>
          <div className={`displayNone ${navigationMenu ? 'navigation__visible' : ''}`}>
            <div className="navigation__buttonExit" onClick={changeNavigationStatusFalse}>
              <div className='navigation__buttonExit-part1'></div>
              <div className='navigation__buttonExit-part2'></div>
            </div>
            <a href="/" className="navigation__buttonMain">Главная</a>
            <a href="/movies" className="navigation__buttonFilms">Фильмы</a>
            <a href="/saved-movies" className="navigation__buttonFilms">Сохраненные фильмы</a>
            <a href="/profile" className='header__wrapperAccount'>
              <div className='header__accountImage'><img src={headerAccount} alt="Аккаунт"></img></div>
              <div className='header__accountText'>Аккаунт</div>
            </a>
          </div>
        </>
      
      )
      : (

        <>
          <a href="/signup" className="header__registr">Регистрация</a>
          <a href="/signin" className="header__login">Войти</a>
        </>

      )}

    </section> 
  );
}

export default Header;
