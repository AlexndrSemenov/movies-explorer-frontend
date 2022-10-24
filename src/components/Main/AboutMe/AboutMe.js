import React from 'react';
import "./AboutMe.css";
import myPhoto from '../../../images/my-photo.jpg';

function AboutMe() {
  return (
    
    <section className="aboutMe">
      <h2 id="aboutMe" className='aboutMe__title'>Студент</h2>
      <div className='aboutMe__wrapper'>
        <img className="aboutMe__photo" src={myPhoto} alt="Фото владельца"/>
        <div className='aboutMe__discription'>
          <h3 className='aboutMe__name'>Александр</h3>
          <p className='aboutMe__profession-age'>Фронтенд-разработчик, 43 года</p>
          <p className='aboutMe__about'>Я родился и живу в г.Чебоксары, имею высшее образование по профессии инженер-механик. У меня есть жена и трое детей. Я люблю активные виды спорта, рыбалку. Недавно начал кодить.</p>
          <a className='aboutMe__link' href="https://github.com/AlexndrSemenov" target="blank">Github</a>
        </div>
      </div>
    </section>
    
  );
}

export default AboutMe;
