import React from 'react';
import "./NavTab.css";

function NavTab() {
  return (
    
    <section className="navTab">
      <div className='navTab-wrapper'>
        <a href="#aboutProject" className="navTab__button">О проекте</a>
        <a href="#techs" className="navTab__button">Технологии</a>
        <a href="#aboutMe" className="navTab__button">Студент</a>
      </div>
    </section>
    
  );
}

export default NavTab;
