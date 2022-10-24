import React from 'react';
import "./AboutProject.css";

function AboutProject() {
  return (
    
    <section className="aboutProject">
      <h2 id="aboutProject" className='aboutProject__title'>О проекте</h2>
      <div className='aboutProject__duration'>
        <div className='aboutProject__duration-part'>
          <h3 className='aboutProject__duration-part-title'>Дипломный проект включал 5 этапов</h3>
          <p className='aboutProject__duration-part-description'>Составление плана, работу над бэкэндом, вёрстку, добавление функциональности и финальные доработки</p>
        </div>
        <div className='aboutProject__duration-part'>
          <h3 className='aboutProject__duration-part-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutProject__duration-part-description'>У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='aboutProject__table'>
        <div className='aboutProject__table-left'>
          <h3 className='aboutProject__table-title-left'>1 неделя</h3>
          <p className='aboutProject__table-description'>Back-end</p>
        </div>
        <div className='aboutProject__table-right'>
          <h3 className='aboutProject__table-title-right'>4 недели</h3>
          <p className='aboutProject__table-description'>Front-end</p>
        </div>
      </div>
    </section>
    
  );
}

export default AboutProject;