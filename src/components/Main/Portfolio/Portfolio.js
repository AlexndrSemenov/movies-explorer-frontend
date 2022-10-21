import React from 'react';
import "./Portfolio.css";
import arrow from '../../../images/text__COLOR_font-main.svg';

function Portfolio() {
  return (
    
    <section className="portfolio">
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__site-static-adaptiv'>
        <li>Статичный сайт</li>
        <li><a href="https://github.com/AlexndrSemenov" target="blank"><img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img></a></li>
      </ul>
      <ul className='portfolio__site-static-adaptiv'>
        <li>Адаптивный сайт</li>
        <li><a href="https://github.com/AlexndrSemenov" target="blank"><img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img></a></li>
      </ul>
      <ul className='portfolio__site-onelist'>
        <li>Одностраничное приложение</li>
        <li><a href="https://github.com/AlexndrSemenov" target="blank"><img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img></a></li>
      </ul>
    </section>
    
  );
}

export default Portfolio;
