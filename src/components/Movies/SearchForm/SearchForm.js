import React from 'react';
import { useState, useEffect } from 'react';
import "./SearchForm.css";

function SearchForm({
  onSearchForm,
  searchText,
  onError,
  changeShort,
  changeSavedShort,
  cancelChangeShot,
  cancelChangeSavedShot,
  isShort,
  isSaveShort,
  moviesErrorText,
  location }) {

  const [searchInputText, setSearchInputText] = useState("");
 
  useEffect(() => {
    if (searchText !== "") {
      setSearchInputText(searchText);
    }
  }, [searchText]);

  function handleSearchTextChange(e) {
    setSearchInputText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInputText === '') {
      onError("Нужно ввести ключевое слово");
    } else {
      onError();
      onSearchForm(searchInputText);
    }
  }
  
  function changeShortt() {
    changeShort();
  }

  function changeShorttSave() {
    changeSavedShort();
  }

  function cancelChangeShott() {
    cancelChangeShot();
  }

  function cancelChangeShottSave() {
    cancelChangeSavedShot();
  }

  return (
    
    <form className="searchForm__title" onSubmit={handleSubmit}>
      <div className='flex'>
        <div className='searchForm__wrapperSeach'>
          <input value={searchInputText || ''} onChange={handleSearchTextChange} className="searchForm__input" placeholder='Фильм'/>
          <button type="submit" className="searchForm__button">Найти</button>
        </div>
        <div className='searchForm__wrapperShot'>
          <p className='searchForm__shotText'>Короткометражки</p>
          {/* меняем реакцию на изменение чекбокса в зависимости от того, на какой странице он отрисован - /movies или /saved-movies */}
          {
            location === "movies" ?
            <label className="checkbox-ios">
	            {isShort ? (
                <input type="checkbox" onChange={ cancelChangeShott } checked={isShort || false} />
                ) : (
                <input type="checkbox" onChange={ changeShortt } checked={isShort || false} />
              )}
	            <span className='checkbox-ios-switch'></span>
            </label>
            :
            <label className="checkbox-ios">
              {isSaveShort ? (
                <input type="checkbox" onChange={ cancelChangeShottSave } checked={isSaveShort || false} />
                ) : (
                <input type="checkbox" onChange={ changeShorttSave } checked={isSaveShort || false} />
              )}
            <span className='checkbox-ios-switch'></span>
            </label>
          }
        </div>
      </div>
            
      <div className='searchForm__message'>{moviesErrorText ? moviesErrorText : " "}</div>

    </form>
  );
}

export default SearchForm;
