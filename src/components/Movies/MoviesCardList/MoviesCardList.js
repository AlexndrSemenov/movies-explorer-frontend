import React from 'react';
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    
    <section>
      <ul className='movies__table'>
        <MoviesCard location={props.location} />
        <MoviesCard location={props.location} />
        <MoviesCard location={props.location} />
        <MoviesCard location={props.location} />
        <MoviesCard location={props.location} />
      </ul>

      <div className='movies__next'>
        <button href="#" className='movies__buttoNext' target="_blank">Ещё</button>
      </div>
    </section>
    
  );
}

export default MoviesCardList;
