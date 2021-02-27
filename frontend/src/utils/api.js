
class Api {
  constructor({ url }) {
    this._url = url;
  }

  // Метод чтения токена и проставления его в заголовок запроса

  setToken(token) {
    this._headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Метод обработки ответа
  _handleResponse(res) {
    return res.json();
  }

  // Метод обработки ошибки запроса
  handleResponseError(err) {
    console.log(err);
  }

  // Получение инфо о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // Обновление данных пользователя
  updateUser(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._handleResponse);
  }

  // Обновление аватара
  updateUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }).then(this._handleResponse);
  }

  // Загрузка массива карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // Добавление карточки
  uploadCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
  }
  // Методы лайков

  changeLikeStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._handleResponse);
    }

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const api = new Api({
  url: '//www.api.hadzime.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
