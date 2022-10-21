import React from 'react';
import "./Footer.css";

function Footer() {
  return (
    
    <section className="footer">
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__wrapper'>
        <div className='footer__wrapper-2'>
          <p className='footer__yandex'>Яндекс.Практикум</p>
          <p className='footer__github'>Github</p>
        </div>
        <p className='footer__copy'>&copy;2022</p>
      </div>
    </section>
    
  );
}

export default Footer;
