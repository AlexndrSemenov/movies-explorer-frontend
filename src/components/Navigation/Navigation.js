import React from 'react';
import "./Navigation.css";

function Navigation() {
  return (
    
    <section className='navigation__visible'>
      <div className=''>
        <button className="navTab__button">О проекте</button>
        <button className="navTab__button">Технологии</button>
        <button className="navTab__button">Студент</button>
      </div>
    </section>
    
  );
}

export default Navigation;