import React from 'react';
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return (
    <main>
      
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />

    </main>
  );
}

export default Main;


// function Main() {
//   return (
//     <main className="gfdsg&?">
      
//       <section className="header">
//         <img className="header__logo" src={headerLogo} alt="Логотип заголовка"/>
//         <button className="header__registr">Регистрация</button>
//         <button className="header__login">Войти</button>
//       </section>
      
//       <section className="promo">
//         <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
//         <img className="promo__logo" src={promoLogo} alt="Логотип заставки"/>
//       </section>

//       <section className="navTab">
//         <div className='navTab-wrapper'>
//           <button className="navTab__button">О проекте</button>
//           <button className="navTab__button">Технологии</button>
//           <button className="navTab__button">Студент</button>
//         </div>
//       </section>

//       <section className="aboutProject">
//         <h2 className='aboutProject__title'>О проекте</h2>
//         <div className='aboutProject__duration'>
//           <div className='aboutProject__duration-part'>
//             <h3 className='aboutProject__duration-part-title'>Дипломный проект включал 5 этапов</h3>
//             <p className='aboutProject__duration-part-description'>Составление плана, работу над бэкэндом, вёрстку, добавление функциональности и финальные доработки</p>
//           </div>
//           <div className='aboutProject__duration-part'>
//             <h3 className='aboutProject__duration-part-title'>На выполнение диплома ушло 5 недель</h3>
//             <p className='aboutProject__duration-part-description'>У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
//           </div>
//         </div>
//         <div className='aboutProject__table'>
//           <div className='aboutProject__table-left'>
//             <h3 className='aboutProject__table-title-left'>1 неделя</h3>
//             <p className='aboutProject__table-description'>Back-end</p>
//           </div>
//           <div className='aboutProject__table-right'>
//             <h3 className='aboutProject__table-title-right'>4 недели</h3>
//             <p className='aboutProject__table-description'>Front-end</p>
//           </div>
//         </div>
//       </section>
      
//       <section className="techs">
//         <h2 className='techs__title'>Технологии</h2>
//         <h3 className='techs__title-2'>7 технологий</h3>
//         <p className='techs__discription'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте</p>
//         <ul className='techs__table'>
//           <li className='techs__table-part'>HTML</li>
//           <li className='techs__table-part'>CSS</li>
//           <li className='techs__table-part'>JS</li>
//           <li className='techs__table-part'>React</li>
//           <li className='techs__table-part'>Git</li>
//           <li className='techs__table-part'>Express.js</li>
//           <li className='techs__table-part'>mongoDB</li>
//         </ul>
//       </section>
      
//       <section className="aboutMe">
//         <h2 className='aboutMe__title'>Студент</h2>
//         <div className='aboutMe__wrapper'>
//           <img className="aboutMe__photo" src={myPhoto} alt="Фото владельца"/>
//           <div className='aboutMe__discription'>
//             <h3 className='aboutMe__name'>Александр</h3>
//             <p className='aboutMe__profession-age'>Фронтенд-разработчик, 43 года</p>
//             <p className='aboutMe__about'>Я родился и живу в г.Чебоксары, имею высшее образование по профессии инженер-механик. У меня есть жена и трое детей. Я люблю активные виды спорта, рыбалку. Недавно начал кодить.</p>
//             <a className='aboutMe__link' href="https://github.com/AlexndrSemenov" target="blank">Github</a>
//           </div>
//         </div>
//       </section>
      
//       <section className="portfolio">
//         <h2 className='portfolio__title'>Портфолио</h2>
//         <ul className='portfolio__site-static-adaptiv'>
//           <li>Статичный сайт</li>
//           <li><a href="https://github.com/AlexndrSemenov" target="blank"><img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img></a></li>
//         </ul>
//         <ul className='portfolio__site-static-adaptiv'>
//           <li>Адаптивный сайт</li>
//           <li><a href="https://github.com/AlexndrSemenov" target="blank"><img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img></a></li>
//         </ul>
//         <ul className='portfolio__site-onelist'>
//           <li>Одностраничное приложение</li>
//           <li><a href="https://github.com/AlexndrSemenov" target="blank"><img src={arrow} alt="Изображение стрелки" className='portfolio__link'></img></a></li>
//         </ul>
//       </section>
      
//       <section className="footer">
//         <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
//         <div className='footer__wrapper'>
//           <div className='footer__wrapper-2'>
//             <p className='footer__yandex'>Яндекс.Практикум</p>
//             <p className='footer__github'>Github</p>
//           </div>
//           <p className='footer__copy'>&copy;2022</p>
//         </div>
//       </section>
      

//     </main>
//   );
// }

// export default Main;