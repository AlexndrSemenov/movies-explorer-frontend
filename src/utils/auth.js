//export const BASE_AUTH_URL = 'https://api.alex.movies.nomoredomains.icu';
export const BASE_AUTH_URL = `${window.location.protocol}//api.alex.movies.nomoredomains.icu`;

//5. Вызовем функцию register для создания пользователя
export const register = (password, email, name) => {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email, name})
  })
  .then((response) => {
    try {
      return response.json();
    } catch (e) {
      return e;
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));

}

//13. Функция, которая будет проверять логин и пароль пользователя на соответствие какому-либо профилю, хранящемуся в базе данных сервера. Вызывается внутри handleSubmit в Login.js. Мы делаем API запрос с помощью fetch. В теле запроса отправляем учётные данные пользователя: email — email и password — пароль пользователя. Этот запрос возвращает промис с response. Затем внутри первого обработчика then вызываем response.json. Этот then также возвращает промис. Вы можете получить доступ к data внутри второго обработчика then
export const authorize = (password, email) => {
  return fetch(`${BASE_AUTH_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .then(data => {
    return data;
  })
  .catch((err) => console.log(err));
}

// обновляем данные пользователя
export const updateUser = (task, token) => {
  return fetch(`${BASE_AUTH_URL}/users/me`, {
    method: 'PATCH',
    headers: { authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
    body: JSON.stringify(task)
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
}

// чтобы проверить токен и получить данные пользователя, создадим ещё один метод авторизации. Функция getContent() принимает в качестве параметра один аргумент — JWT. Он будет отправлен на сервер (API) по маршруту /users/me, и, если токен действителен, вернёт ответ с информацией о пользователе - _id и email.
export const getContent = (token) => {
  return fetch(`${BASE_AUTH_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data);
}
