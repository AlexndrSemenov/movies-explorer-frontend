import React from 'react';
import { Route, Switch, withRouter, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
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
  DURATION_SHORT_MOVIE,
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
  const [isReloadPage, reloadPage] = useState([]);
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
  //количество найденных фильмов
  const [numberMoviesFound, setNumberMoviesFound] = useState('');
  //количество фильмов на экране
  const [numberMoviesOnScreen, setNumberMoviesOnScreen] = useState('');
  //добавляемое количество фильмов при клике "еще"
  const [numberMoviesClickMore, setNumberMoviesClickMore] = useState('');
  //показывать кнопку "еще" или нет
  const [showMoreButton, setShowMoreButton] = useState();
  

  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  // состояние отображения страницы - после начальной загрузки или после 1 2 и тд. поиска
  const [isSearch, setSearch] = useState();
  //меняет состояние после первого изменения чекбокса
  const [isAfterFirstChangeSavedShort, setAfterFirstChangeSavedShort] = useState();
  // состояние чекбокса на странице saved-movies
  const [isSaveShort, setSaveShort] = useState();
  // текст поиска по фильмам с лайком
  const [searchSavedText, setSearchSavedText] = useState("");
  // отображаемые сохраненные фильмы
  const [displayedSavedMovies, setDisplayedSavedMovies] = useState([]);
  // id сохраненных фильмов
  const [idSavedMovies, setIdSavedMovies] = useState([]);
  //первоначально найденные сохраненные фильмы
  const [initialSavedMovies, setInitialSavedMovies] = useState([]);
  //найденные сохраненные фильмы для вывода на экран
  const [screenSavedMovies, setScreenSavedMovies] = useState([]);
  

  // начальная загрузка после авторизации/перезагрузки страниц
  useEffect(() => {
    tokenCheck();

    if ((!localStorage.moviesOnServer) && (location === '/movies')) {
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem("moviesOnServer", JSON.stringify(movies));
        })
        .catch((err) => {
          changeErrorMessage(SERVER_ERROR_MESSAGE);
          console.log(err);
        })
    }

    if (loggedIn) {
      const token = localStorage.getItem("token");
      mainApi.getSavedMovies(token)
        .then((movies) => {
          localStorage.setItem("savedMovies", JSON.stringify(movies));
          changeSavedMoviesId(movies);
        })
        .catch(err => console.log(err))
    }
  }, [location, loggedIn])


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
    reloadPage([]);
  }  
  
  // переключение чекбокса на short
  function changeShort() {
    const a = JSON.parse(localStorage.getItem("initialMovies"));
    let b = [];
    b = a.filter(movie => movie.duration <= DURATION_SHORT_MOVIE);
    localStorage.setItem("screenMovies", JSON.stringify(b));
    localStorage.setItem("short", true);
    setIsShort(true);
    setShowMoreButton();
  }

  // переключение чекбокса на не short
  function cancelChangeShot() {
    const a = JSON.parse(localStorage.getItem("initialMovies"));
    localStorage.setItem("screenMovies", JSON.stringify(a));
    localStorage.removeItem("short");
    setIsShort(false);
  }
  
  // рефреш страницы при изменении isReloadPage и isShort
  useEffect(() => {
    if (location === '/movies') {
      if (localStorage.searchText) {
        setSearchText(localStorage.getItem('searchText'));
      }
      setIsShort(localStorage.getItem("short" || "") === "true");
      const a = JSON.parse(localStorage.getItem("screenMovies"));
      if (isShort) {
        setDisplayedMovies(a);
      } else {
        //измеряем numberMoviesOnScreen, numberMoviesClickMore
        changeNumberMovieOnScreenOrRow();
        setNumberMoviesFound(a.length);
        //numberMoviesFound > numberMoviesOnScreen ? показываем кнопку "Еще"
        changeShowMoreButton(numberMoviesFound, numberMoviesOnScreen);
        setDisplayedMovies(a.slice(0, numberMoviesOnScreen));
      }
    } 
  }, [ isReloadPage, isShort ]);


  //---------------------------- /saved-movies ------------------------------/

  // поиск фильмов на странице сохраненных фильмов
  function seachSavedMovies(textFromSavedSeachForm) {
    setSearchSavedText(textFromSavedSeachForm);
    const b = savedMovies.filter(movie => {
      return new RegExp(textFromSavedSeachForm, "i").test(movie.nameRU);
    });
    setInitialSavedMovies(b);
    setScreenSavedMovies(b);
    setSearch(true);
    if (isSaveShort) {
      changeSavedShort();
    }
    reloadPage([]);
  }

  function changeSavedMoviesId(movies) {
    const a = [];
    movies.forEach(movie => a.push(movie.movieId));
    setIdSavedMovies(a);
  }
  
  // переключение чекбокса на short
  function changeSavedShort() {
    const a = (
      isSearch ?
      initialSavedMovies :
      savedMovies
    )
    let b = [];
    b = a.filter(movie => movie.duration <= DURATION_SHORT_MOVIE);
    setScreenSavedMovies(b);
    setAfterFirstChangeSavedShort(true);
    setSaveShort(true);
  }

  // переключение чекбокса на не short
  function cancelChangeSavedShot() {
    const a = (
      isSearch ?
      initialSavedMovies :
      savedMovies
    )
    setScreenSavedMovies(a);
    setSaveShort();
  }

  // Поиск фильмов на странице сохраненных фильмов
  useEffect(() => {
    if (location === '/saved-movies') {
      setShowPreloader(true);
      setDisplayedSavedMovies(
        isSearch ?
        screenSavedMovies :
          ( isAfterFirstChangeSavedShort ?
            screenSavedMovies :
            savedMovies)
      );
      setShowPreloader();
    }
  }, [ isReloadPage, isSaveShort ]);

  
  //--------изменение количества фильмов на странице---------//
  
  function changeNumberMovieOnScreenOrRow() {
    console.log(numberMoviesOnScreen, screenWidth, numberMoviesClickMore)
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
    setShowMoreButton();
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
    reloadPage([]);
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
    reloadPage([]);
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
          onSearchForm={seachSavedMovies}
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

// import React from 'react';
// import { Route, Switch, withRouter, useLocation, useHistory } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Header from "../Header/Header";
// import Main from "../Main/Main";
// import Footer from "../Footer/Footer";
// import Movies from "../Movies/Movies";
// import SavedMovies from "../SavedMovies/SavedMovies";
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Profile from '../Profile/Profile';
// import moviesApi from '../../utils/MoviesApi';
// import mainApi from '../../utils/MainApi';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRout';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// // импортируем auth с содержимим хитрым образом
// import * as auth from '../../utils/auth';

// import {
//   DURATION_SHORT_MOVIE,
//   QUANTITY_DISPLAYED_MOVIES_DESKTOP,
//   QUANTITY_PERROW_MOVIES_DESKTOP,
//   QUANTITY_DISPLAYED_MOVIES_LAPTOP,
//   QUANTITY_PERROW_MOVIES_LAPTOP,
//   QUANTITY_DISPLAYED_MOVIES_MOBILE,
//   QUANTITY_PERROW_MOVIES_MOBILE,
//   SERVER_ERROR_MESSAGE,
//   EMAIL_ALREADY_REGISTERED,
//   EMAIL_ALREADY_EXIST,
//   REGISRATION_ERROR,
//   VALIDATION_FAILED,
//   INCORRECT_DATA,
//   INCORRECT_LOGIN_OR_PASSWORD,
// } from "../../constants";

// function App2() {

//   const [loggedIn, changeLoggedIn] = useState();
//   // фильмы скачанные с сервера https://api.nomoreparties.co/beatfilm-movies
//   const [allMovies, setAllMovies] = useState([]);
//   // фильмы с лайком
//   const [allSavedMovies, setAllSavedMovies] = useState([]);
//   // id фильмов с лайком
//   const [allSavedMoviesIds, setAllSavedMoviesIds] = useState([]);
//   // все найденные фильмы
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   // количество найденных фильмов
//   const [countFilteredMovies, setCountFilteredMovies] = useState(0);
//   // отображаемые фильмы
//   const [displayedMovies, setDisplayedMovies] = useState([]);
//   // отображаемые фильмы с лайком
//   const [displayedSavedMovies, setDisplayedSavedMovies] = useState([]);
//   // количество отображаемых фильмов
//   const [countDisplayedMovies, setCountDisplayedMovies] = useState(0);
//   // фильмов в 1 ряду
//   const [moviesPerRow, setMoviesPerRow] = useState(0);
//   // показ кнопки "Ещё"
//   const [moreButtonVisible, setMoreButtonVisible] = useState();
//   // текст поиска
//   const [searchText, setSearchText] = useState("");
//   // текст поиска по фильмам с лайком
//   const [searchSavedText, setSearchSavedText] = useState("");
//   // новый поиск или нет
//   const [newSearch, setNewSearch] = useState();
//   // сообщение ошибки при поиске
//   const [moviesErrorText, setMoviesErrorText] = useState("");
//   // прелоадер показывать или нет
//   const [isLoading, setIsLoading] = useState();
//   // текущий пользователь
//   const [currentUser, setCurrentUser] = useState({});
//   // текущая локация
//   const location = useLocation().pathname;
//   // ошибка при сабмите формы
//   const [profileErrorText, setProfileErrorText] = useState("");
//   // состояние чекбокса на странице movies
//   const [isShort, setIsShort] = useState();
//   // состояние чекбокса на странице saved-movies
//   const [isSaveShort, setSaveShort] = useState();
//   const history = useHistory();

//   // 001. загрузка состояния (строки поиска, фильмов, проверка токена) если в localStorage и на сервере что-то есть
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const token = localStorage.getItem("token");
//       mainApi.getSavedMovies(token)
//         .then((movies) => {
//           setAllSavedMovies(movies);
//         })
//         .catch((err) => {                    
//           console.log(err);
//         });
//       }
//     // отслеживаем токен при загрузке страницы
//     tokenCheck();
//     // Рассчитываем начальное кол-во отображаемых и подгружаемых фильмов
//     changeDisplayedMoviesNum();
//     // Проверяем и подгружаем данные если они есть из localStorage
//     setIsShort(localStorage.getItem('short' || '') === 'true');
//     setSaveShort(localStorage.getItem('saveShot' || '') === 'true');
//     if (!newSearch && localStorage.searchText && localStorage.searchSavedText) {
//       setSearchText(localStorage.getItem("searchText"));
//       setSearchSavedText(localStorage.getItem("searchSavedText"));
//       setFilteredMovies(
//         JSON.parse(localStorage.getItem("filteredMovies"))
//       );
//     };
//     console.log('108');
//   }, []);

//   // рассчитываем количество выводимых фильмов в зависимости от размера экрана
//   function changeDisplayedMoviesNum() {
//     const displayWidth = window.screen.width;
//     if (displayWidth > 768) {
//       setCountDisplayedMovies(QUANTITY_DISPLAYED_MOVIES_DESKTOP);
//       setMoviesPerRow(QUANTITY_PERROW_MOVIES_DESKTOP);
//     } else if (displayWidth > 480 && displayWidth <= 768) {
//       setCountDisplayedMovies(QUANTITY_DISPLAYED_MOVIES_LAPTOP);
//       setMoviesPerRow(QUANTITY_PERROW_MOVIES_LAPTOP);
//     } else {
//       setCountDisplayedMovies(QUANTITY_DISPLAYED_MOVIES_MOBILE);
//       setMoviesPerRow(QUANTITY_PERROW_MOVIES_MOBILE);
//     }
//   }

//   useEffect(() => {
//     changeSavedMoviesId();
//   }, [allSavedMovies]);

//   function changeSavedMoviesId() {
//     let arrIds = [];
//     allSavedMovies.forEach((movie) => {
//       arrIds.push(movie.movieId);
//     });
//     setAllSavedMoviesIds(arrIds);
//   }

//   // Получаем все фильмы
//   useEffect(() => {
//     if (allMovies.length === 0) {
//       // Запускаем прелоадер
//       setIsLoading(true);
//       // 01. В случае изменения searchText (нажатие кнопки поиска) и если до этого запрос ксерверу не проводился (allMovies.length === 0), получаем все фильмы по API с https:/api.nomoreparties.co/beatfilm-movies
//       moviesApi.getMovies()
//         .then((movies) => {
//           // Помещаем все фильмы с сервера в стейт-переменную allMovies
//           setAllMovies(movies);
//         })
//         .catch((err) => {
//           handleMoviesErrorMessage(SERVER_ERROR_MESSAGE);
//           console.log(err);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//       }
//       if (newSearch) {
//         setFilteredMovies(
//           allMovies.filter((movie) => {
//             // Фильтруем на короткометражки
//             if (isShort) {
//               if (movie.duration > DURATION_SHORT_MOVIE) return false;
//             }
//             const re = new RegExp(searchText, "i");
//             return re.test(movie.nameRU);
//           })
//         );
//       };
//   }, [ allMovies.length, searchText, isShort, allMovies, newSearch ]);

//   // ищем фильмы на странице фильмы
//   function handleSearch(searchText) {
//     setNewSearch(true);
//     setSearchText(searchText);
//   }

//   // Вывод фильмов на странице фильмов
//   useEffect(() => {
//     // Вычисляем общее кол-во найденых фильмов
//     const countMovies = filteredMovies.length;
//     setCountFilteredMovies(countMovies);
//     // Сохраняем данные в localStorage
//     if (newSearch && countMovies > 0) {
//       localStorage.setItem("searchText", searchText);
//       localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
//     }
//     checkMoreButton(countDisplayedMovies, countMovies);
//     // устанавливаем массив отображаемых  фильмов (displayedMovies) из массива всех  фильмов(allMovies) с учетом слов поиска (searchText) и состояния чекбокса (isSave) (см.выше).Здесь укорачиваем массив до нужного количества фильмов
//     setDisplayedMovies(
//       filteredMovies.slice(0, countDisplayedMovies)
//     );
//     console.log(displayedMovies);
//   //}, [filteredMovies, countDisplayedMovies, isShort, searchText, newSearch, allMovies]);
//   }, [filteredMovies]);

//   // ищем фильмы на странице сохраненных фильмов
//   function handleSavedSearch(searchText) {
//     setSearchSavedText(searchText);
//   }

//   // Вывод фильмов на странице сохраненных фильмов
//   useEffect(() => {
//     // устанавливаем массив отображаемых сохраненных фильмов (displayedSavedMovies) из массива всех    фильмов c лайком (allSavedMovies) с учетом слов поиска (searchSavedText) и состояния чекбокса    (isSaveShort)
//     setDisplayedSavedMovies(
//       allSavedMovies.filter((movie) => {
//         // Фильтруем на короткометражки
//         if (isSaveShort) {
//           if (movie.duration > DURATION_SHORT_MOVIE) return false;
//         }
//         const re = new RegExp(searchSavedText, "i");
//         return re.test(movie.nameRU);
//       })
//     );
//     localStorage.setItem("searchSavedText", searchSavedText);
//   }, [allSavedMovies, searchSavedText, isSaveShort]);

//   // Вывод ошибок пользователю при поиске фильмов
//   function handleMoviesErrorMessage(message) {
//     setMoviesErrorText(message);
//   }

//   // вывод ошибок при сабмите формы
//   function changeProfileErrorText(message) {
//     setProfileErrorText(message);
//     setTimeout(() => {
//       setProfileErrorText("");
//     }, 3000);
//   }
   
//   function handleChangeShot() {
//     setIsShort(true);
//     localStorage.setItem('short', true);
//   }
  
//   function handleChangeShotSave() {
//     setSaveShort(true);
//     localStorage.setItem('saveShot', true);
//   }
  
//   function cancelChangeShot() {
//     setIsShort();
//     localStorage.removeItem('short');
//   }
  
//   function cancelChangeShotSave() {
//     setSaveShort();
//     localStorage.removeItem('saveShot');
//   }  

//   // добавляем новые фильмы к отображению при нажатии кнопки "Ещё"
//   function loadMoreMovies() {
//     let newСountDisplayedMovies = countDisplayedMovies + moviesPerRow;
//     // изменяем количество подгружаемых фильмов для последней подгрузки
//     if (newСountDisplayedMovies > countFilteredMovies)
//       newСountDisplayedMovies = countFilteredMovies;
//     setDisplayedMovies(
//       displayedMovies.concat(
//         filteredMovies.slice(countDisplayedMovies, newСountDisplayedMovies)
//       )
//     );
//     // добавляем новые фильмы в отображаемый массив
//     setCountDisplayedMovies(newСountDisplayedMovies);
//     // показываем кнопку "Ещё"?
//     checkMoreButton(newСountDisplayedMovies, countFilteredMovies);
//   }

//   // Проверяем показывать ли кнопку для подгрузки
//   function checkMoreButton(visibleNumberMovies, numberMovies) {
//     visibleNumberMovies < numberMovies ?
//     setMoreButtonVisible(true) :
//     setMoreButtonVisible(false);
//   }

//   // Для реализации выхода из системы нужно удалить JWT-токен из localStorage и переадресоватьпользователя на страницу /. Поскольку app — функциональный компонент, воспользуемся«Реакт-хуком» useHistory
//   function signOut() {
//     setAllMovies([]);
//     setAllSavedMovies([]);
//     setAllSavedMoviesIds([]);
//     setFilteredMovies([]);
//     setCountFilteredMovies(0);
//     setDisplayedMovies([]);
//     setDisplayedSavedMovies([]);
//     setCountDisplayedMovies(0);
//     setMoviesPerRow(0);
//     setMoreButtonVisible();
//     setSearchText("");
//     setSearchSavedText("");
//     setNewSearch();
//     setMoviesErrorText("");
//     setCurrentUser({});
//     setProfileErrorText("");
//     setIsShort();
//     setSaveShort();
//     changeLoggedIn();
//     localStorage.removeItem("filteredMovies");
//     localStorage.removeItem("searchText");
//     localStorage.removeItem("saveShot");
//     localStorage.removeItem("short");
//     localStorage.removeItem("token");
//     history.push("/");
//   }
    
//   // лайк фильма
//   function handleMovieSave(movie) {
//     const token = localStorage.getItem("token");
//     mainApi.postMovie(movie, token)
//       .then((savedMovie) => {
//         setAllSavedMovies([...allSavedMovies, savedMovie]);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
    
//   // снятие лайка
//   function handleMovieDelete(id) {
//     const token = localStorage.getItem("token");
//     let newSavedMoviesArr = [];
//     allSavedMovies.forEach((movie) => {
//       if (movie.movieId === id) {
//           mainApi.deleteMovie(movie._id, token)
//             .then()
//             .catch((err) => {
//               console.log(err);
//             });
//       } else {
//         newSavedMoviesArr.push(movie);
//       }
//     });
//     setAllSavedMovies(newSavedMoviesArr);
//   }
    
//   //---------работа с пользователем - регистрация, авторизация, изменение профиля----------//
  
//   // теперь нужно создать обработчик в App. Назовите его handleUpdateUser и задайте его в виде нового пропса onUpdateUser для компонента EditProfilePopup. Внутри этого обработчика вызовите api.setUserInfo. После завершения запроса обновите стейт currentUser из полученных данных и закройте все модальные окна
//   function handleUpdateUser(user) {
//     setIsLoading(true);
//     //api.updateUser(user, token)
//     const token = localStorage.getItem("token");
//     auth.updateUser(user, token)
//       .then(newUser => {
//         if (newUser.message) {
//           changeProfileErrorText(newUser.message);
//         } else {
//           setCurrentUser(newUser);
//         }
//       })
//       .catch(err => console.log(err))
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }

//   // Проверяет наличие у пользователя токена, чтобы входить в систему без авторизации. Еслион есть в localStorage — берём токен оттуда
//   function tokenCheck() {
//     // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет
//     const token = localStorage.getItem("token");
//     //103. Здесь будем проверять токен
//     if ( token ) {
//       // проверим токен
//       auth.getContent(token)
//       .then(res => {
//         if (res) {
//           // авторизуем пользователя
//           changeLoggedIn(true);
//           setCurrentUser(res);
//         }
//       })
//       .catch(err => console.log(err));
//     }
//   }
  
//   // работа с регистрацией
//   function onRegister(registrationData) {
//     setIsLoading(true);
//     auth.register(registrationData.password, registrationData.email, registrationData.name)
//     .then(res => {
//       // добавим ещё один then() в метод handleSubmit(). Пользователь должен бытьпереадресован на /movies, только если форма регистрации правильно заполнена и отправлена
//       if(!res){
//         changeProfileErrorText(SERVER_ERROR_MESSAGE);
//       }
//       else if(res.message){
//         res.message === EMAIL_ALREADY_REGISTERED ?
//         changeProfileErrorText(EMAIL_ALREADY_EXIST) :
//         changeProfileErrorText(REGISRATION_ERROR);
//       } else {
//         //сразу же авторизовываемся
//         handleLogin(registrationData);
//       }
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//       setIsLoading(false);
//     });
//   }
  
//   // чтобы поменять значение loggedIn, создадим метод внутри App.js, поскольку loggedIn находится в state внутри компонента App
//   function handleLogin(e) {
//     setIsLoading(true);
//     if (!e.password || !e.email){
//       return;
//     }
//     // после запуска authorize, если всё получилось, возвращается объект с JWT-токеном. После этого нужно очистить стейт и перенаправить пользователя на главную страницу с помощью метода history.push
//     auth.authorize(e.password, e.email)
//     .then(data => {
//       if (!data) {
//         changeProfileErrorText(SERVER_ERROR_MESSAGE);
//       }
//       if (data.message) {
//         data.message === VALIDATION_FAILED ?
//         changeProfileErrorText(INCORRECT_DATA) :
//         changeProfileErrorText(INCORRECT_LOGIN_OR_PASSWORD);
//       }
//       // если пользователь нашёлся и его учётные данные действительны, в ответе от сервера будет token. Проверяем наличие token в ответе от сервера, если есть сохраняем токен в локальном хранилище, чтобы впоследстви после сверки токена на сервере и лок.хран. пользователь мог логиниться при открытии сайта без авторизации
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         // обратите внимание, что мы не изменили значение loggedIn на true внутри App.js,     поэтому пользователи будут немедленно перенаправляться обратно на страницу авторизации. Ведь ProtectedRoute будет отображать маршрут /body только в том случае, если loggedIn равно true. Обновляем стейт внутри App.js
//         changeLoggedIn(true);
//         setCurrentUser(e);
//         // применим history.push для отправки пользователей на movies после авторизации в приложении
//         history.push("/movies");    
//       }
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//       setIsLoading(false);
//     });
//   }
  
//   return (
//     <CurrentUserContext.Provider value={currentUser}>

//       { location === "/" ||
//         location === "/movies" ||
//         location === "/saved-movies" ||
//         location === "/profile" ? 
//         <Header loggedIn={loggedIn} /> :
//         ("")
//       }
//       <Switch>
//         <ProtectedRoute
//           path="/movies"
//           component={Movies}
//           loggedIn={loggedIn}
//           onSearchForm={handleSearch}
//           movies={displayedMovies}
//           handleChangeShot={handleChangeShot}
//           cancelChangeShot={cancelChangeShot}
//           isShort={isShort}
//           searchText={searchText}
//           loadMoreMovies={loadMoreMovies}
//           moreButtonVisible={moreButtonVisible}
//           message={moviesErrorText}
//           onError={handleMoviesErrorMessage}
//           isLoading={isLoading}
//           onMovieSave={handleMovieSave}
//           onMovieDelete={handleMovieDelete}
//           savedIds={allSavedMoviesIds}
//         />
//         <ProtectedRoute
//           path="/saved-movies"
//           component={SavedMovies}
//           loggedIn={loggedIn}
//           onSearchForm={handleSavedSearch}
//           movies={displayedSavedMovies}
//           searchText={searchSavedText}
//           onError={handleMoviesErrorMessage}
//           isLoading={isLoading}
//           onMovieDelete={handleMovieDelete}
//           savedIds={allSavedMoviesIds}
//           message={moviesErrorText}
//           handleChangeShotSave={handleChangeShotSave}
//           cancelChangeShotSave={cancelChangeShotSave}
//           isSaveShort={isSaveShort}
//         />
//         <ProtectedRoute
//           path="/profile"
//           loggedIn={loggedIn}
//           component={Profile}
//           handleUpdateUser={handleUpdateUser}
//           profileErrorText={profileErrorText}
//           signOut={signOut}
//         />
//         <Route path="/signup">
//           <Register
//             onRegister={onRegister}
//             profileErrorText={profileErrorText}
//           />
//         </Route>
//         <Route path="/signin">
//           <Login
//             handleLogin={handleLogin}
//             profileErrorText={profileErrorText}
//           />
//         </Route>
//         <Route exact path="/">
//           <Main />
//         </Route>
//       </Switch>
//       { location === "/" ||
//         location === "/movies" ||
//         location === "/saved-movies" ? 
//         <Footer /> : 
//         ("")
//       }

//     </CurrentUserContext.Provider>
//   );
// }

// // export default withRouter(App);

