import React from 'react';
import { Route, Switch, withRouter, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRout';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// импортируем auth с содержимим хитрым образом
import * as auth from '../../utils/auth';

import {
  SERVER_ERROR_MESSAGE,
  EMAIL_ALREADY_REGISTERED,
  EMAIL_ALREADY_EXIST,
  REGISRATION_ERROR,
  VALIDATION_FAILED,
  INCORRECT_DATA,
  INCORRECT_LOGIN_OR_PASSWORD,
} from "../../utils/constants";

function App() {

  // пользователь авторизован или нет
  const [loggedIn, setLoggedIn] = useState();
  // текущий пользователь
  const [currentUser, setCurrentUser] = useState({});
  // ошибка при сабмите формы работы с пользователем
  const [profileErrorText, setProfileErrorText] = useState("");
  // текущая локация
  const location = useLocation().pathname;
  // прелоадер показывать или нет
  const [showPreloader, setShowPreloader] = useState();
  //вспомогательная стейт переменная для рефреша страницы
  const history = useHistory();


   // состояние чекбокса на странице movies
  const [isShort, setIsShort] = useState();
  // текст поиска
  const [searchText, setSearchText] = useState("");
  // отображаемые фильмы
  const [displayedMovies, setDisplayedMovies] = useState([]);
   // сообщение ошибки при поиске
   const [moviesErrorText, setMoviesErrorText] = useState("");
  

  //ширина экрана пользователя
  const screenWidth = document.documentElement.clientWidth;
  //количество фильмов на экране
  const [numberMoviesOnScreen, setNumberMoviesOnScreen] = useState('');
  //добавляемое количество фильмов при клике "еще"
  const [numberMoviesClickMore, setNumberMoviesClickMore] = useState('');
  //показывать кнопку "еще" или нет
  const [showMoreButton, setShowMoreButton] = useState(false);
  //количество найденных фильмов
  const [numberMoviesFound, setNumberMoviesFound] = useState('');
  

  // сохраненные пользователем фильмы
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  // короткие сохраненные пользователем фильмы
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  // id сохраненных фильмов
  const [idSavedMovies, setIdSavedMovies] = useState([]);
  // найденные фильмы
  const [seachSavedMovies, setSeachSavedMovies] = useState([]);
  // найденные короткие фильмы
  const [seachShortSavedMovies, setSeachShortSavedMovies] = useState([]);
  // состояние отображения страницы - после начальной загрузки или после 1 2 и тд. поиска
  const [isSearch, setSearch] = useState(false);
  //меняет состояние после первого изменения чекбокса
  const [isAfterFirstChangeSavedShort, setAfterFirstChangeSavedShort] = useState(false);
  // состояние чекбокса на странице saved-movies
  const [isSaveShort, setSaveShort] = useState(false);
  // текст поиска по фильмам с лайком
  const [searchSavedText, setSearchSavedText] = useState("");
  // отображаемые сохраненные фильмы
  const [displayedSavedMovies, setDisplayedSavedMovies] = useState([]);
  const [fff, setfff] = useState([]);
  
  //--------------------------все работает-------------без сиач----
  
  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      if (!localStorage.moviesOnServer) {
      moviesApi.getMovies()
      .then((movies) => {
        localStorage.setItem("moviesOnServer", JSON.stringify(movies));
      })
      .catch((err) => {
        changeErrorMessage(SERVER_ERROR_MESSAGE);
        console.log(err);
      })
    }
     const token = localStorage.getItem("token");
    mainApi.getSavedMovies(token)
      .then((movies) => {
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        changeSavedMoviesId(movies);
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  //---------------------------- /movies ------------------------------/  

  // функция поиска фильмов на странице /movies
  function seachMovies(textFromSeachForm) {
    setSearchText(textFromSeachForm);
    localStorage.setItem("searchText", textFromSeachForm);
    const a = JSON.parse(localStorage.getItem("moviesOnServer"));
    const b = a.filter(movie => {
      // благодаря i при анализе строк игнорируется регистр символов
      return new RegExp(textFromSeachForm, "i").test(movie.nameRU);
    });
    localStorage.setItem("initialMovies", JSON.stringify(b));
    localStorage.setItem("screenMovies", JSON.stringify(b));
    if (isShort) {
      changeShort();
    }
    //обновляем количество фильмов на странице
    changeNumberMovieOnScreenOrRow();
  }  
  
  // переключение чекбокса на short
  function changeShort() {
    const a = JSON.parse(localStorage.getItem("initialMovies"));
    let b = [];
    b = a.filter(movie => movie.duration <= 40);
    localStorage.setItem("screenMovies", JSON.stringify(b));
    localStorage.setItem("short", true);
    setIsShort(true);
    setShowMoreButton(false);
  }

  // переключение чекбокса на не short
  function cancelChangeShot() {
    const a = JSON.parse(localStorage.getItem("initialMovies"));
    localStorage.setItem("screenMovies", JSON.stringify(a));
    localStorage.removeItem("short");
    changeNumberMovieOnScreenOrRow();
    setIsShort(false);
  }

  useEffect(() => {
    if (location === '/movies') {
      if (localStorage.searchText) {
        setSearchText(localStorage.getItem('searchText'));
      }
      setIsShort(localStorage.getItem("short" || "") === "true");
      const screenMovies = JSON.parse(localStorage.getItem("screenMovies"));
    if (localStorage.initialMovies) { 
        if (isShort) {
          setDisplayedMovies(screenMovies);
        } else {
          //измеряем numberMoviesOnScreen, numberMoviesClickMore
          changeNumberMovieOnScreenOrRow();
          setNumberMoviesFound(screenMovies.length);
          //numberMoviesFound > numberMoviesOnScreen ? показываем кнопку "Еще"
          changeShowMoreButton(numberMoviesFound, numberMoviesOnScreen);
          setDisplayedMovies(screenMovies.slice(0, numberMoviesOnScreen));
        };
  }
    } 
  }, [ searchText, numberMoviesFound, isShort ]);

  
  //---------------------------- /saved-movies ------------------------------/
  
  useEffect(() => {
    if (location === '/saved-movies') { 
      setShortSavedMovies(savedMovies.filter(movie => movie.duration <= 40));
    }
  }, [searchSavedText]);
  
  useEffect(() => {
    if (location === '/saved-movies') { 
    setSeachSavedMovies(savedMovies.filter(movie => {
      return new RegExp(searchSavedText, "i").test(movie.nameRU);
    }));
  }
  }, [searchSavedText, isSaveShort]);

  useEffect(() => {
    if (location === '/saved-movies') { 
    setSeachShortSavedMovies(seachSavedMovies.filter(movie => movie.duration <= 40));
    }
  }, [searchSavedText, isSaveShort]);

  // поиск фильмов на странице сохраненных фильмов
  function sseachSavedMovies(textFromSavedSeachForm) {
    setSearchSavedText(textFromSavedSeachForm);
    setSearch(true);
  }

  // переключение чекбокса на short
  function changeSavedShort() {
    setAfterFirstChangeSavedShort(true);
    setSaveShort(true);
  }

  // переключение чекбокса на не short
  function cancelChangeSavedShot() {
    setSaveShort(false);
  }

  function changeSavedMoviesId(movies) {
    const a = [];
    movies.forEach(movie => a.push(movie.movieId));
    setIdSavedMovies(a);
  }

  // Поиск фильмов на странице сохраненных фильмов
  useEffect(() => {
    if (location === '/saved-movies') {
      setShowPreloader(true);
      if (isSearch) {
        setDisplayedSavedMovies (
          isSaveShort ?
          seachShortSavedMovies :
          seachSavedMovies
      )} else {
          if (isAfterFirstChangeSavedShort) {
            setDisplayedSavedMovies (
              isSaveShort ?
              seachShortSavedMovies :
              seachSavedMovies
          )} else {
            setDisplayedSavedMovies (
              isSaveShort ?
              shortSavedMovies :
              savedMovies
          )}
      }
      setShowPreloader();
    }
  }, [ searchSavedText, isSaveShort, isAfterFirstChangeSavedShort, seachSavedMovies, idSavedMovies ]);

  //--------изменение количества фильмов на странице---------//
  
  function changeNumberMovieOnScreenOrRow() {
    if (screenWidth < 481) {
      setNumberMoviesOnScreen(5);
      setNumberMoviesClickMore(1);
    } else if (screenWidth < 769) {
      setNumberMoviesOnScreen(8);
      setNumberMoviesClickMore(2);
    } else {
      setNumberMoviesOnScreen(12);
      setNumberMoviesClickMore(3);
    }
  } 
  
  //показываем новую строку
  function showNewRowMovies() {
    let newNumberMoviesOnScreen = (numberMoviesOnScreen + numberMoviesClickMore);
    if (newNumberMoviesOnScreen > numberMoviesFound)
      newNumberMoviesOnScreen = numberMoviesFound;
    setDisplayedMovies(
      displayedMovies.concat((JSON.parse(localStorage.getItem("screenMovies"))).slice(numberMoviesOnScreen, newNumberMoviesOnScreen))
    );
    setNumberMoviesOnScreen(newNumberMoviesOnScreen);
    changeShowMoreButton(numberMoviesFound, newNumberMoviesOnScreen);
  }

  //отрисовываем кнопку еще
  function changeShowMoreButton (movies, screenMovies) {
    movies > screenMovies ?
    setShowMoreButton(true) :
    setShowMoreButton(false);
  }

  //-------------------------------общие функции-----------------------//
  
  // лайк фильма
  function likeMovie(movie) {
    const token = localStorage.getItem("token");
    mainApi.postMovie(movie, token)
      .then((savedMovie) => {
        const b = savedMovies.concat(savedMovie);
        localStorage.setItem("savedMovies", JSON.stringify(b));
        changeSavedMoviesId(b);
      }) 
      .catch(err => console.log(err));
  }
    
  // дизлайк фильма
  function dizlikeMovie(id) {
    const token = localStorage.getItem("token");
    let b = [];
    savedMovies.forEach((movie) => {
      (movie.movieId === id) ?
        (mainApi.deleteMovie(movie._id, token)
          .then()
          .catch(err => console.log(err))) :
        b.push(movie);
    });
    localStorage.setItem("savedMovies", JSON.stringify(b));
    changeSavedMoviesId(b);
  }

  // Вывод ошибок пользователю при поиске фильмов
  function changeErrorMessage(message) {
    setMoviesErrorText(message);
  }

  // вывод ошибок при сабмите формы работы с пользователем
  function changeProfileErrorText(message) {
    setProfileErrorText(message);
    setTimeout(() => {
      setProfileErrorText("");
    }, 3000);
  }
    

  //---------работа с пользователем - регистрация, авторизация, изменение профиля----------//
  
  // теперь нужно создать обработчик в App. Назовите его handleUpdateUser и задайте его в виде нового пропса onUpdateUser для компонента EditProfilePopup. Внутри этого обработчика вызовите api.setUserInfo. После завершения запроса обновите стейт currentUser из полученных данных и закройте все модальные окна
  function handleUpdateUser(user) {
    setShowPreloader(true);
    const token = localStorage.getItem("token");
    auth.updateUser(user, token)
      .then(newUser => {
        if (newUser.message) {
          changeProfileErrorText(newUser.message);
        } else {
          setCurrentUser(newUser);
          changeProfileErrorText('Ваши данные успешно изменены');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setShowPreloader(false);
      });
  }

  // Проверяет наличие у пользователя токена, чтобы входить в систему без авторизации. Еслион есть в localStorage — берём токен оттуда
  function tokenCheck() {
    // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет
    const token = localStorage.getItem("token");
    //103. Здесь будем проверять токен
    if ( token ) {
      // проверим токен
      auth.getContent(token)
      .then(res => {
        if (res) {
          // авторизуем пользователя
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch(err => console.log(err));
    }
  }
  
  // работа с регистрацией
  function onRegister(registrationData) {
    setShowPreloader(true);
    auth.register(registrationData.password, registrationData.email, registrationData.name)
    .then(res => {
      // добавим ещё один then() в метод handleSubmit(). Пользователь должен бытьпереадресован на /movies, только если форма регистрации правильно заполнена и отправлена
      if(!res){
        changeProfileErrorText(SERVER_ERROR_MESSAGE);
      }
      else if(res.message){
        res.message === EMAIL_ALREADY_REGISTERED ?
        changeProfileErrorText(EMAIL_ALREADY_EXIST) :
        changeProfileErrorText(REGISRATION_ERROR);
      } else {
        //сразу же авторизовываемся
        handleLogin(registrationData);
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      setShowPreloader(false);
    });
  }
  
  // чтобы поменять значение loggedIn, создадим метод внутри App.js, поскольку loggedIn находится в state внутри компонента App
  function handleLogin(e) {
    setShowPreloader(true);
    if (!e.password || !e.email){
      return;
    }
    // после запуска authorize, если всё получилось, возвращается объект с JWT-токеном. После этого нужно очистить стейт и перенаправить пользователя на главную страницу с помощью метода history.push
    auth.authorize(e.password, e.email)
    .then(data => {
      if (!data) {
        changeProfileErrorText(SERVER_ERROR_MESSAGE);
      }
      if (data.message) {
        data.message === VALIDATION_FAILED ?
        changeProfileErrorText(INCORRECT_DATA) :
        changeProfileErrorText(INCORRECT_LOGIN_OR_PASSWORD);
      }
      // если пользователь нашёлся и его учётные данные действительны, в ответе от сервера будет token. Проверяем наличие token в ответе от сервера, если есть сохраняем токен в локальном хранилище, чтобы впоследстви после сверки токена на сервере и лок.хран. пользователь мог логиниться при открытии сайта без авторизации
      if (data.token) {
        localStorage.setItem('token', data.token);
        // обратите внимание, что мы не изменили значение loggedIn на true внутри App.js, поэтому пользователи будут немедленно перенаправляться обратно на страницу авторизации. Ведь ProtectedRoute будет отображать маршрут /body только в том случае, если loggedIn равно true. Обновляем стейт внутри App.js
        setLoggedIn(true);
        setCurrentUser(e);
        // применим history.push для отправки пользователей на movies после авторизации в приложении
        history.push("/movies");    
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      setShowPreloader(false);
    });
  }
  
  // Для реализации выхода из системы нужно удалить JWT-токен из localStorage и переадресоватьпользователя на страницу /. Поскольку app — функциональный компонент, воспользуемся«Реакт-хуком» useHistory
  function signOut() {
    setIdSavedMovies([]);
    setDisplayedMovies([]);
    setDisplayedSavedMovies([]);
    setSearchText("");
    setSearchSavedText("");
    setMoviesErrorText("");
    setCurrentUser({});
    setProfileErrorText("");
    setIsShort();
    setLoggedIn();
    localStorage.removeItem("moviesOnServer");
    localStorage.removeItem("token");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("screenMovies");
    localStorage.removeItem("initialMovies");
    localStorage.removeItem("searchText");
    localStorage.removeItem("searchSavedText");
    localStorage.removeItem("short");
    localStorage.removeItem("saveShot");
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      { location === "/" ||
        location === "/movies" ||
        location === "/saved-movies" ||
        location === "/profile" ? 
        <Header loggedIn={loggedIn} /> :
        ("")
      }
      <Switch>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          onSearchForm={seachMovies}
          movies={displayedMovies}
          searchText={searchText}
          moviesErrorText={moviesErrorText}
          onError={changeErrorMessage}
          showPreloader={showPreloader}
          onMovieSave={likeMovie}
          onMovieDelete={dizlikeMovie}
          savedIds={idSavedMovies}
          changeShort={changeShort}
          cancelChangeShot={cancelChangeShot}
          isShort={isShort}
          showMoreButton={showMoreButton}
          showNewRowMovies={showNewRowMovies}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          onSearchForm={sseachSavedMovies}
          movies={displayedSavedMovies}
          searchText={searchSavedText}
          onError={changeErrorMessage}
          showPreloader={showPreloader}
          onMovieDelete={dizlikeMovie}
          savedIds={idSavedMovies}
          moviesErrorText={moviesErrorText}
          changeSavedShort={changeSavedShort}
          cancelChangeSavedShot={cancelChangeSavedShot}
          isSaveShort={isSaveShort}
        />
        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          handleUpdateUser={handleUpdateUser}
          profileErrorText={profileErrorText}
          signOut={signOut}
        />
        <Route path="/signup">
          <Register
            onRegister={onRegister}
            profileErrorText={profileErrorText}
          />
        </Route>
        <Route path="/signin">
          <Login
            handleLogin={handleLogin}
            profileErrorText={profileErrorText}
          />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      { location === "/" ||
        location === "/movies" ||
        location === "/saved-movies" ? 
        <Footer /> : 
        ("")
      }

    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
