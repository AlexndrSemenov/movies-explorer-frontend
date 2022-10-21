import React from 'react';
import "./Techs.css";

function Techs() {
  return (
    
    <section className="techs">
      <h2 id="techs" className='techs__title'>Технологии</h2>
      <h3 className='techs__title-2'>7 технологий</h3>
      <p className='techs__discription'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте</p>
      <ul className='techs__table'>
        <li className='techs__table-part'>HTML</li>
        <li className='techs__table-part'>CSS</li>
        <li className='techs__table-part'>JS</li>
        <li className='techs__table-part'>React</li>
        <li className='techs__table-part'>Git</li>
        <li className='techs__table-part'>Express.js</li>
        <li className='techs__table-part'>mongoDB</li>
      </ul>
    </section>
    
  );
}

export default Techs;
