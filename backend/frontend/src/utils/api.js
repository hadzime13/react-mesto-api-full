class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  // Метод обработки ответа
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.statusText);
  };

  // Метод обработки ошибки запроса
  handleResponseError(err) {
    console.log(`Error,${err}`);
    return Promise.reject(err['message']);
  };

  // Получение инфо о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    },
    )
      .then(this._handleResponse)
  }

  // Обновление данных пользователя
  updateUser(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData['name'],
        about: userData['about']
      })
    },
    )
      .then(this._handleResponse)
  };

  // Обновление аватара
  updateUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
      })
    },
    )
      .then(this._handleResponse)
  };

  // Загрузка массива карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    },
    )
      .then(this._handleResponse)
  };

  // Добавление карточки
  uploadCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    },
    )
      .then(this._handleResponse)
  };
  // Удаление карточки 
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    },
    )
      .then(this._handleResponse)
  };
  // Методы лайков

  changeLikeStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._handleResponse)
    }
    else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._handleResponse)
    }
  };
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '37456d63-78f1-44ef-bbbe-976c826581c0',
    'Content-Type': 'application/json'
  }
});

export default api;