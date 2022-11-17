import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useLocation, useHistory } from 'react-router-dom';
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

import {
  SERVER_ERROR_MESSAGE,
  EMAIL_ALREADY_REGISTERED,
  REGISRATION_ERROR,
  AUTHOR_ERROR,
  INCORRECT_DATA,
  INCORRECT_LOGIN_OR_PASSWORD,
  FAILED_TO_FETCH,
  UPDATE_USER_ERROR,
  DURATION_MOVIES_SHORT,
  PHONE_SCREEN_WIDTH,
  PAD_SCREEN_WIDTH,
  LAPTOP_SCREEN_WIDTH,
  NUMBER_MOVIES_ON_SCREEN_PHONE,
  NUMBER_MOVIES_ON_SCREEN_PAD,
  NUMBER_MOVIES_ON_SCREEN_LAPTOP,
  NUMBER_MOVIES_ON_SCREEN_DESKTOP,
  NUMBER_MOVIES_CLICK_MORE_PHONE,
  NUMBER_MOVIES_CLICK_MORE_PAD,
  NUMBER_MOVIES_CLICK_MORE_LAPTOP,
  NUMBER_MOVIES_CLICK_MORE_DESKTOP,
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
  // деактивируем поля ввода / кнопку сабмита
  const [isInvisible, setIsInvisible] = useState(false);
  // навигация по сайту
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
  
  
  //--------------------инициализация----------------------//
  
  useEffect(() => {
    if ((location !== "/signin") && (location !== "/signup")) {
      tokenCheck();
    }
    
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
    b = a.filter(movie => movie.duration <= DURATION_MOVIES_SHORT);
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
  }, [ searchText, numberMoviesFound, isShort, numberMoviesClickMore, screenWidth ]);

  
  //---------------------------- /saved-movies ------------------------------/
  
  useEffect(() => {
    if (location === '/saved-movies') { 
      setShortSavedMovies(savedMovies.filter(movie => movie.duration <= DURATION_MOVIES_SHORT));
    }
  }, [searchSavedText, idSavedMovies]);
  
  useEffect(() => {
    if (location === '/saved-movies') { 
    setSeachSavedMovies(savedMovies.filter(movie => {
      return new RegExp(searchSavedText, "i").test(movie.nameRU);
    }));
  }
  }, [searchSavedText, isSaveShort, idSavedMovies]);

  useEffect(() => {
    if (location === '/saved-movies') { 
    setSeachShortSavedMovies(seachSavedMovies.filter(movie => movie.duration <= DURATION_MOVIES_SHORT));
    }
  }, [searchSavedText, isSaveShort, idSavedMovies]);

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
    if (screenWidth < PHONE_SCREEN_WIDTH) {
      setNumberMoviesOnScreen(NUMBER_MOVIES_ON_SCREEN_PHONE);
      setNumberMoviesClickMore(NUMBER_MOVIES_CLICK_MORE_PHONE);
    } else if (screenWidth < PAD_SCREEN_WIDTH) {
      setNumberMoviesOnScreen(NUMBER_MOVIES_ON_SCREEN_PAD);
      setNumberMoviesClickMore(NUMBER_MOVIES_CLICK_MORE_PAD);
    } else if (screenWidth < LAPTOP_SCREEN_WIDTH) {
      setNumberMoviesOnScreen(NUMBER_MOVIES_ON_SCREEN_LAPTOP);
      setNumberMoviesClickMore(NUMBER_MOVIES_CLICK_MORE_LAPTOP);
    } else {
      setNumberMoviesOnScreen(NUMBER_MOVIES_ON_SCREEN_DESKTOP);
      setNumberMoviesClickMore(NUMBER_MOVIES_CLICK_MORE_DESKTOP);
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
      .catch(err => {
        console.log(err);
        if (err.status === 401 ) {
          signOut();
          history.push("/");
        }
      });
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
    

  //---------работа с пользователем - проверка токена, регистрация, авторизация, изменение профиля----------//

  function handleUpdateUser(user) {
    setShowPreloader(true);
    setIsInvisible(true);
    const token = localStorage.getItem("token");
    mainApi.updateUser(user, token)
      .then(newUser => {
        setCurrentUser(newUser);
        changeProfileErrorText('Ваши данные успешно изменены');
      })
      .catch(err => {
        console.log(err);
        err.message === FAILED_TO_FETCH  ?
        changeProfileErrorText(SERVER_ERROR_MESSAGE):
        err.status === 409 ?
        changeProfileErrorText(EMAIL_ALREADY_REGISTERED) :
        changeProfileErrorText(UPDATE_USER_ERROR)
      })
      .finally(() => {
        setIsInvisible(false);
        setShowPreloader(false);
      });
  }

  // Проверяет наличие у пользователя токена, чтобы входить в систему без авторизации. Еслион есть в localStorage — берём токен оттуда
  function tokenCheck() {
    // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет
    const token = localStorage.getItem("token");
    if ( token ) {
      // проверим токен
      mainApi.getContent(token)
      .then(res => {
        if (res) {
          // авторизуем пользователя
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch(err => {
        console.log(err);
        signOut();
      });
    }
  }
  
  // регистрируем пользователя
  function onRegister(data) {
    setShowPreloader(true);
    setIsInvisible(true);
    mainApi.register(data.password, data.email, data.name)
    .then(res => {
      handleLogin(data);
    })
    .catch(err => {
      console.log(err);
      err.status === 409 ?
      changeProfileErrorText(EMAIL_ALREADY_REGISTERED) :
      err.message === FAILED_TO_FETCH  ?
      changeProfileErrorText(SERVER_ERROR_MESSAGE):
      changeProfileErrorText(REGISRATION_ERROR)
    })
    .finally(() => {
      setIsInvisible(false);
      setShowPreloader(false);
    });
  }
  
  // вход на сайт - авторизация пользователя
  function handleLogin(e) {
    setShowPreloader(true);
    setIsInvisible(true);
    if (!e.password || !e.email){
      return;
    }
    // после запуска authorize, если всё получилось, возвращается объект с JWT-токеном. После этого нужно очистить стейт и перенаправить пользователя на главную страницу с помощью метода history.push
    mainApi.authorize(e.password, e.email)
    .then(data => {
      // если пользователь нашёлся и его учётные данные действительны, в ответе от сервера будет token. Проверяем наличие token в ответе от сервера, если есть сохраняем токен в локальном хранилище, чтобы впоследстви после сверки токена на сервере и лок.хран. пользователь мог логиниться при открытии сайта без авторизации (если не стирать токен при signOut)
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setCurrentUser(e);
        history.push("/movies");
      }
    })
    .catch(err => {
      console.log(err);
      err.status === 400 ?
      changeProfileErrorText(INCORRECT_DATA) :
      err.status === 401 ?
      changeProfileErrorText(INCORRECT_LOGIN_OR_PASSWORD) :
      err.message === FAILED_TO_FETCH  ?
      changeProfileErrorText(SERVER_ERROR_MESSAGE):
      changeProfileErrorText(AUTHOR_ERROR);
    })
    .finally(() => {
      setIsInvisible(false);
      setShowPreloader(false);
    });
  }
  
  // выход из системы
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
          isInvisible={isInvisible}
        />
        <Route path="/signup">
          <Register
            onRegister={onRegister}
            profileErrorText={profileErrorText}
            loggedIn={loggedIn}
            isInvisible={isInvisible}
          />
        </Route>
        <Route path="/signin">
          <Login
            handleLogin={handleLogin}
            profileErrorText={profileErrorText}
            loggedIn={loggedIn}
            isInvisible={isInvisible}
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
