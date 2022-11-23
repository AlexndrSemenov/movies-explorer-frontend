import { MOVIES_URL } from "./constants";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject('Произошла ошибка');
  }

  getMovies() {
    return fetch(`${this._url}`, { headers: this._headers })
      .then(this._checkResponse);
  }
}

const moviesApi = new Api({
  url:  MOVIES_URL + '/beatfilm-movies',
  headers: { 'Content-Type': 'application/json' },
});

export default moviesApi;
