import React from 'react';
import { useEffect } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  onSearchForm,
  movies,
  searchText,
  moviesErrorText,
  onError,
  showPreloader,
  onMovieSave,
  onMovieDelete,
  savedIds,
  changeShort,
  cancelChangeShot,
  isShort,
  showMoreButton,
  showNewRowMovies }) {
  
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
        changeShort={changeShort}
        cancelChangeShot={cancelChangeShot}
        isShort={isShort}
        moviesErrorText={moviesErrorText}
        location={"movies"}
      />
      {showPreloader ? 
      <Preloader /> :
      (
        <MoviesCardList
          movies={movies}
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          savedIds={savedIds}
          showMoreButton={showMoreButton}
          showNewRowMovies={showNewRowMovies}
        />
      )}
    </section>
  );
}

export default Movies;
