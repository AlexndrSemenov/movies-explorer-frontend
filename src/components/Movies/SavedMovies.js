import React from "react";
import { useEffect } from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  onSearchForm,
  searchText,
  onError,
  movies,
  showPreloader,
  onMovieDelete,
  savedIds,
  changeSavedShort,
  cancelChangeSavedShot,
  moviesErrorText,
  isSaveShort }) {
    
    useEffect(() => {
      if (searchText && movies.length === 0) {
        onError('Ничего не найдено');
      } else {onError('')}
    }, [movies]);
    
  return (
    <section>
      <SearchForm
        onSearchForm={onSearchForm}
        searchText={searchText}
        onError={onError}
        changeSavedShort={changeSavedShort}
        cancelChangeSavedShot={cancelChangeSavedShot}
        isSaveShort={isSaveShort}
        moviesErrorText={moviesErrorText}
        location={"saved-movies"}
      />
      {showPreloader ?
      <Preloader /> :
      (
        <MoviesCardList
          movies={movies}
          onMovieDelete={onMovieDelete}
          savedIds={savedIds}
        />
      )}
    </section>
  );
}

export default SavedMovies;
