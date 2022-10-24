import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import "./Profile.css";

function Profile() {

  return(
    <div className="profile__form">
      <div className="profile__title">
        <div>Привет,</div>
        <div className="profile__title-name">Виталий!</div>
      </div>
      {/* <form onSubmit={handleSubmit} className="register__form"></form> */}
      <form>
        
        <div className='profile__text'>
          <div>Имя</div>
          <div className='profile__text-name'>Виталий</div>
        </div>

        <div className='profile__text'>
          <div>E-mail</div>
          <div className='profile__text-email'>pochta@yandex.ru</div>
        </div>

        <Link type="submit" className="profile__link">Редактировать</Link>
        <Link className="profile__link-quit">Выйти из аккаунта</Link>
      </form>

    </div>
  )
}

//10. см. выше
export default Profile;
