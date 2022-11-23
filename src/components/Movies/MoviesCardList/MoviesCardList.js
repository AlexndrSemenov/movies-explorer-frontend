import React from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  onMovieSave,
  onMovieDelete,
  savedIds,
  showMoreButton,
  showNewRowMovies }) {

  return (
    
    <section>

      {movies.length ? (
        <ul className='movies__table'>
            {movies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id || movie._id || movie.movieId}
                onMovieSave={onMovieSave}
                onMovieDelete={onMovieDelete}
                saved={savedIds.includes(movie.id)}
              />
            ))}
        </ul>
      ) : (
        ""
      )}
      
      <div className='movies__next'>
        { showMoreButton ? 
          (<button className='movies__buttoNext' onClick={showNewRowMovies}>Ещё</button>) :
          ("")
        }
      </div>
    </section>
    
  )}

export default MoviesCardList;
