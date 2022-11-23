import React from 'react';
import "./Portfolio.css";
import arrow from '../../../images/text__COLOR_font-main.svg';

function Portfolio() {
  return (
    
    <section className="portfolio">
      <h2 className='portfolio__title'>Портфолио</h2>
      <a href="https://github.com/AlexndrSemenov/how-to-learn" className='portfolio__wrapper' target="blank">
        <span>Статичный сайт</span>
        <img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img>
      </a>
      <a href="https://github.com/AlexndrSemenov/russian-travel" className='portfolio__wrapper' target="blank">
        <span>Адаптивный сайт</span>
        <img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img>
      </a>
      <a href="https://github.com/AlexndrSemenov/react-mesto-api-full" className='portfolio__wrapper' target="blank">
        <span>Одностраничное приложение</span>
        <img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img>
      </a>
    </section>
    
  );
}

export default Portfolio;
