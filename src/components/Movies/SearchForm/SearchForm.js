import React from 'react';
import "./SearchForm.css";

function SearchForm() {
  return (
    
    // <form onSubmit={handleSubmit} className="register__form"></form>
    <form className="searchForm__title">
      <div className='searchForm__wrapperSeach'>
        {/* <input className="login__input" id="email" required name="email" type="text" value={email} onChange={handleChangeEmail} placeholder='Email' /> */}
        <input className="searchForm__input" id="email" required name="email" type="text" placeholder='Фильм' />
        {/* <button type="submit" className="register__link">Войти</button> */}
        <button type="submit" className="searchForm__button">Найти</button>
      </div>
      <div className='searchForm__wrapperShot'>
        <p className='searchForm__shotText'>Короткометражки</p>
        <label class="checkbox-ios">
	        <input type="checkbox"></input>
	        <span class="checkbox-ios-switch"></span>
        </label>
      </div>

      

    </form>
    
  );
}

export default SearchForm;