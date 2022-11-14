import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from '../../images/header-logo.svg';
import headerAccount from '../../images/account.svg';
import headerAccountLight from '../../images/account-light.svg';
import headerButtonMenu from '../../images/header-buttonMenu.svg';
import headerButtonMenuLight from '../../images/header-buttonMenu-light.svg';

function Header(props) {
  
  // текущая локация
  const location = useLocation().pathname;
  // показываем или скрываем меню навигации
  const [navigationMenu, setNavigationStatus] = useState(false);
  function changeNavigationStatus() {
    setNavigationStatus(true);
  }
  function changeNavigationStatusFalse() {
    setNavigationStatus(false);
  }

  return (
    <section className={ location==='/' ? (`${'header'} ${'header__dark'}`) : ('header') }>
      
      <a href="/" className='header__logo'><img src={headerLogo} alt="Логотип заголовка"></img></a>

      {props.loggedIn ? (
        <>
          <div className='header__wrapperMovies'>
            <a href="/movies" className={ 
              (location==='/') ? (`${'header__movies'} ${'header__font-light'}`) :
              (location==='/movies') ? (`${'header__movies'} ${'header__font-bold'}`) :
              ('header__movies') } >Фильмы</a>
            <a href="/saved-movies" className={ 
              (location==='/') ? `${'header__saveMovies'} ${'header__font-light'}` :
              (location==='/saved-movies') ? (`${'header__saveMovies'} ${'header__font-bold'}`) :
              ('header__saveMovies') } >Сохраненные фильмы</a>
          </div>
          
          <Link to="/profile" className={ location==='/' ? (`${'header__wrapperAccount'} ${'header__wrapperAccount-light'}`) : ('header__wrapperAccount') }>
            <div className='header__accountImage'><img src={ location==='/' ? headerAccountLight : headerAccount } alt="Аккаунт"></img></div>
            <div className='header__accountText'>Аккаунт</div>
          </Link>

          <button className={ location==='/' ? (`${'header__buttomMenu'} ${'header__buttomMenu-dark'}`) : ('header__buttomMenu') } onClick={changeNavigationStatus}>
            
            <img src={ location==='/' ? headerButtonMenuLight : headerButtonMenu } alt="Аккаунт"></img>
          </button>
          
          <div className={`displayNone ${navigationMenu ? 'navigation__visible' : ''}`}>
            <div className="navigation__buttonExit" onClick={changeNavigationStatusFalse}>
              <div className='navigation__buttonExit-part1'></div>
              <div className='navigation__buttonExit-part2'></div>
            </div>
            <a href="/" className="navigation__buttonMain">Главная</a>
            <a href="/movies" className="navigation__buttonFilms">Фильмы</a>
            <a href="/saved-movies" className="navigation__buttonFilms">Сохраненные фильмы</a>
            
            <Link to="/profile" className='header__wrapperAccount-list' onClick={changeNavigationStatusFalse}>
              <div className='header__accountImage'><img src={headerAccount} alt="Аккаунт"></img></div>
              <div className='header__accountText'>Аккаунт</div>
            </Link>
          </div>

        </>
      ) : (
        <>
          <a href="/signup" className="header__registr">Регистрация</a>
          <a href="/signin" className="header__login">Войти</a>
        </>
      )}

    </section> 
  );
}

export default Header;
