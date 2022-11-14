import React from 'react';
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { MOVIES_URL } from "../../../utils/constants";
import likeLayeOne from '../../../images/like-layeOne.svg';
import savedMuviesCross from '../../../images/saved-muvies-cross.svg';

function MoviesCard({ movie, onMovieSave, onMovieDelete, saved }) {
  
  const location = useLocation().pathname;

  function convertTime(duration) {
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    return hours + "ч " + minutes + "м";
  }

  function handleSaveClick() {
      onMovieSave(movie);
  }

  //movie.movieId у /saved-movies ___ movie.id у /movies
  function handleDeleteClick() {
    onMovieDelete(movie.movieId || movie.id);
  }

  return (
    <li className="movies__item">
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          src={
            movie.image.url ? MOVIES_URL + movie.image.url : movie.image
          }
          className="movies__screen"
          alt={movie.nameRU}
          title={movie.nameRU}
        />
      </a>
      <div className='movies__wrapperName'>
        <div className='movies__name'>{movie.nameRU}</div>
        
        {location === "/saved-movies" ? (
          <button className="movies__likeWrapper" onClick={handleDeleteClick}>
            <img src={savedMuviesCross} alt="значек лайка" className="movies__likeOne"></img>
          </button>
        ) : (
          <button className='movies__likeWrapper' onClick={saved ? handleDeleteClick : handleSaveClick}>
            <img src={likeLayeOne} alt="значек лайка" className="movies__likeOne"></img>
            <div className={`movies__likeTwo ${saved ? "movies__likeTwo-activ" : ""}`}></div>
          </button>
        )}
      </div>
      <div className='movies__duration'>{convertTime(movie.duration)}</div>
    </li>
  
  );
}

export default MoviesCard;
