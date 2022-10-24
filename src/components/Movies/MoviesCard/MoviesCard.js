import React from 'react';
import "./MoviesCard.css";
import filmPoster from '../../../images/film-poster.jpg';
import likeLayeOne from '../../../images/like-layeOne.svg';
import savedMuviesCross from '../../../images/saved-muvies-cross.svg';

function MoviesCard(props) {
  return (
    <li class="movies__item">
      <img src={filmPoster} alt="фильм" class="movies__screen"></img>
      <div className='movies__wrapperName'>
        <div className='movies__name'>Властелин колец</div>


        <button className={ props.location==='/movies' ? ('movies__likeWrapper') : ('displayNone') }>
          <img src={likeLayeOne} alt="значек лайка" class="movies__likeOne"></img>
          {/* <div className='movies__likeTwo-grey'></div> */}
          <div className='movies__likeTwo-green'></div>
        </button>


        <button className={ props.location==='/saved-movies' ? ('movies__likeWrapper') : ('displayNone') }>
          <img src={savedMuviesCross} alt="значек лайка" class="movies__likeOne"></img>
        </button>


      </div>
      <div className='movies__duration'>1ч42м</div>
    </li>
  
  );
}

export default MoviesCard;