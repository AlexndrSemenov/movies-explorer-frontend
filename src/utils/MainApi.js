import { MOVIES_URL } from "./constants";

class Api {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject('Произошла ошибка');
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: { authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
    })
    .then(this._checkResponse);
  }
  
  postMovie(movie, token) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: { authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
        trailerLink: movie.trailerLink,
        image: MOVIES_URL + movie.image.url,
        description: movie.description,
        year: movie.year,
        duration: movie.duration,
        director: movie.director,
        country: movie.country,
      }),
    })
    .then(this._checkResponse);
  }
  
  deleteMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: { authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
    })
    .then(this._checkResponse);
  }
}

const mainApi = new Api({
  url: `${window.location.protocol}//api.alex.movies.nomoredomains.icu`,
});

export default mainApi;
