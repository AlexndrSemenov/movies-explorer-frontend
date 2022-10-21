import React from 'react';
import { Route, Switch, Redirect, withRouter, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

// import ProtectedRoute from '../ProtectedRoute';
// import InfoTooltip from '../InfoTooltip';
// import Body from '../Body';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import api from '../../utils/Api';
// //8. Импортируем auth с содержимим хитрым образом
// import * as auth from '../../utils/auth';

function App() {
  
  // //объявляем переменные
  // const history = useHistory();
  const location = useLocation().pathname;
  //стейт переменная loggedIn, true если значение токена пользователя в localStorage совпадает с токеном, который сайт генерировал ранее, false - не совпадает 
  const [loggedIn, changeLoggedIn] = useState();
  // const [userEmail, setUserEmail] = useState({});
  // const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  // const [title, setTitle] = useState('');
  // const [imageClassName, setImageClassName] = useState('');
  // //В компоненте App создайте переменную состояния currentUser и эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения
  // const [currentUser, setCurrentUser] = useState({ _id: 0, name: "", about: "", avatar: "" });
  
  // //переменные состояния, отвечающие за видимость трёх попапов: isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddCardPopupOpen
  // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  // //const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  // const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  // const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  
  // const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) }
  // const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) }
  // const handleAddPlaceClick = () => { setIsAddCardPopupOpen(true) }
  // const handleCardClick = (card) => {
  //   setIsImagePopupOpen(true);
  //   setSelectedCard(card);
  // }

  // const closeAllPopup = () => {
  //   //скрываем попапы
  //   setIsEditAvatarPopupOpen(false);
  //   setIsEditProfilePopupOpen(false);
  //   setIsAddCardPopupOpen(false);
  //   //setIsDeleteCardPopupOpen(false);
  //   setIsImagePopupOpen(false);
  //   setInfoTooltipPopupOpen(false);
  //   //сбрасываем значение selectedCard
  //   setSelectedCard({ name: '', link: '' });
  // }

  // //24. Работа с попапами подтверждения при регистрации пользователя на сайте
  // const confirmationError = () => {
  //   setImageClassName('popup__confirmation-error');
  //   setTitle('Что-то пошло не так! Попробуйте ещё раз.');
  //   setInfoTooltipPopupOpen(true);
  // }
  // const confirmationSuccess = () => {
  //   setImageClassName('popup__confirmation-success');
  //   setTitle('Вы успешно зарегистрировались.');
  //   setInfoTooltipPopupOpen(true);
  // }

  // // Стейт для карточек, по умолчанию [], после устанавливаем сюда данные запроса
  // let [cards, setCards] = useState([]);

  // const token = localStorage.getItem('token');

  // // React.useEffect(() => {
  // //   if (token) {
  // //     Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
  // //       .then(([userData, cardData]) => {
  // //         setCurrentUser(userData);
  // //         setCards(cardData);
  // //         changeLoggedIn(true);
  // //       })
  // //       .catch((err) => console.log(err));
  // //   }
  // // }, [loggedIn, token]);

  // //Теперь нужно создать обработчик в App. Назовите его handleUpdateUser и задайте его в виде нового пропса onUpdateUser для компонента EditProfilePopup. Внутри этого обработчика вызовите api.setUserInfo. После завершения запроса обновите стейт currentUser из полученных данных и закройте все модальные окна
  // function handleUpdateUser(user) {
  //   api.updateUser(user, token)
  //     .then(newUser => {
  //       setCurrentUser(newUser);
  //     })
  //     .catch(err => console.log(err));
  
  //   closeAllPopup();
  // }

  // //редактируем имя/описание пользователя
  // function handleUpdateAvatar(avatar) {
  //   api.updateUserAvatar(avatar, token)
  //     .then(newAvatar => {
  //       setCurrentUser(newAvatar);
  //     })
  //     .catch(err => console.log(err));
  
  //   closeAllPopup();
  // }

  // //добавляем карточку
  // function handleAddPlaceSubmit(place) {
  //   api.createCard(place, token)
  //     .then(newPlace => {
  //       setCards([newPlace, ...cards]);
  //       closeAllPopup();
  //     })
  //     .catch(err => console.log(err));
  // }

  // //ставим или снимаем лайк карточке
  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.card.likes.some(i => i === currentUser._id);
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card.card._id, !isLiked, token).then((newCard) => {
  //     setCards((cards) => cards.map(c => c._id === card.card._id ? newCard : c));
  //   })
  //   .catch(err => console.log(err));
  // }

  // //удаляем карточку
  // function handleCardDelete(card) {
  //   api.deleteCard(card.card._id, token)
  //   .then(() => {
  //     setCards((cards) => cards.filter(c => c._id !== card.card._id));
  //     })
  //   .catch(err => console.log(err));
  //   closeAllPopup();
  // }
  
  // //23. Для реализации выхода из системы нужно удалить JWT-токен из localStorage и переадресовать пользователя на страницу /login. Поскольку NavBar — функциональный компонент, воспользуемся «Реакт-хуком» useHistory
  // function signOut(){
  //   localStorage.removeItem('token');
  //   changeLoggedIn(false);
  //   history.push('/sign-in');
  // }

  // //работа с компонентами login и register - до успешной авторизации на сайте

  // //22. отслеживаем токен
  // // useEffect(() => {
  // //   tokenCheck();
  // // }, []);

  // //20. Проверяет наличие у пользователя токена, чтобы входить в систему без авторизации. Еслион есть в localStorage — берём токен оттуда
  // function tokenCheck() {
  //   // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет
  //   const token = localStorage.getItem('token');
  //     //22. Здесь будем проверять токен
  //   if ( token ) {
  //     // проверим токен
  //     auth.getContent(token)
  //     .then(res => {
  //       if (res) {
  //         // здесь получаем данные пользователя
  //         // авторизуем пользователя
  //         changeLoggedIn(true);
  //         setUserEmail(res.email);
  //         history.push("/ ");
  //       }
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }
  
  // //работа с регистрацией
  // function onRegister(registrationData) {
  //   auth.register(registrationData.password, registrationData.email)
  //   .then((res) => {
  //     //11. Добавим ещё один then() в метод handleSubmit(). Пользователь должен бытьпереадресован   на /login, только если форма регистрации правильно заполнена и отправлена
  //     if(res){
  //       confirmationSuccess();
  //       //12. Юзер переадрисовывается на экран авторизации
  //       history.push('/sign-in');
  //     } else {
  //       confirmationError();
  //     }
  //   })
  //   .catch(err => console.log(err));
  // }
  
  // //16. Чтобы поменять значение loggedIn, создадим метод внутри App.js, поскольку loggedIn находится в state внутри компонента App
  // function handleLogin(e) {
  //   if (!e.password || !e.email){
  //     return;
  //   }
  //   //15. После запуска authorize, если всё получилось, возвращается объект с JWT-токеном. После этого нужно очистить стейт и перенаправить пользователя на главную страницу с помощью метода history.push
  //   auth.authorize(e.password, e.email)
  //   .then(data => {
  //     if (data.token){
  //       //18. Обратите внимание, что мы не изменили значение loggedIn на true внутри App.js,     поэтому пользователи будут немедленно перенаправляться обратно на страницу авторизации. Ведь ProtectedRoute будет отображать маршрут /body только в том случае, если loggedIn равно true. Обновляем стейт внутри App.js
  //       changeLoggedIn(true);
  //       setUserEmail(e.email);
  //       //19. применим history.push для отправки пользователей на главную страницу сайта после авторизации в приложении
  //       history.push("/ ");    
  //     }
  //   })
  //   .catch(err => {//запускается, если пользователь не найден
  //     confirmationError();
  //     console.log(err);
  //   });
  // }

  return (
    <main className="body">
      {/* <CurrentUserContext.Provider value={ currentUser }> */}
        
          
          {/* 2. перенаправляем пользователя на определённый путь в зависимости от статуса его   авторизации. Если пользователь посетит / или любой другой маршрут, который не определён   в приложении, неавторизованные пользователи будут перенаправлены на /login */}
          {/* <Route exact path="/">
            {loggedIn ? <Redirect to="/protectedRoute" /> : <Redirect to="/movies" />}
          </Route> */}

          {
            location === '/' ||
            location === '/movies' ||
            location === '/saved-movies' ||
            location === '/profile'
              ? ( <Header loggedIn={loggedIn} location={location}/> )
              : ( '' )
          }

          <Switch>

            <Route exact path="/">
              <Main />
            </Route>

            <Route path="/movies">
              <Movies />
            </Route>

            <Route path="/saved-movies">
              <Movies />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/signup">
              <Register />
            </Route>

            <Route path="/signin">
              <Login />
            </Route>

          </Switch>

          {
            location === '/' ||
            location === '/movies' ||
            location === '/saved-movies'
              ? ( <Footer /> )
              : ( '' )
          }

          {/* 4. Реализуем компонент более высокого порядка (3. см. ProtectedRoute.js). Теперь   роут /body/ защищен. Если пользователь не авторизуется в приложении и просто наберёт его   адрес в браузере, то будет автоматически переадресован на страницу компонента Login
          <ProtectedRoute
            exact path="/ "
            component={Body}
            loggedIn={loggedIn}
            userEmail={userEmail}
            signOut={signOut}

            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleCardClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}

            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            closeAllPopup={closeAllPopup}
            handleUpdateAvatar={handleUpdateAvatar}

            isEditProfilePopupOpen={isEditProfilePopupOpen}
            handleUpdateUser={handleUpdateUser}

            isAddCardPopupOpen={isAddCardPopupOpen}
            handleAddPlaceSubmit={handleAddPlaceSubmit}

            selectedCard={selectedCard}
            isImagePopupOpen={isImagePopupOpen}
          /> */}

          {/* 17. Передадим Login этот новый метод как пропс:
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route> */}

        
      {/* </CurrentUserContext.Provider> */}
      
      {/* <InfoTooltip isOpen={infoTooltipPopupOpen} onClose={closeAllPopup} imageClassName={imageClassName} title={title}/> */}

    </main>
  );
}

export default withRouter(App);
