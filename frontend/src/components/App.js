import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { InfoToolTip } from './InfoTooltip';
import api from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import PageNotFound from './PageNotFound';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as mestoAuth from '../mestoAuth';

function App() {
  // Переменные состояния
  // Массив карточек
  const [cards, setCards] = useState([]);
  //открыт попап профиля или нет
  const [isEditProfilePopupOpen, setPopupProfileState] = useState(false);
  //открыт попап добавления карточки или нет
  const [isAddPlacePopupOpen, setPopupPlaceState] = useState(false);
  // открыт попап редактирования аватара или нет
  const [isEditAvatarPopupOpen, setPopupAvatarState] = useState(false);
  // Открыт ли попап инфо о регистрации
  const [isInfoTooltipOpen, setInfoTooltipState] = useState(false);
  // Активна ли кнопка редактирования аватара
  const [isAvatarEditButtonActive, setAvatarEditButton] = useState(false);
  // выбор карточки
  const [selectedCard, setSelectedCard] = useState({});
  // Пользователь
  const [currentUser, setCurrentUser] = useState({});
  // Залогинен ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  // Данные текущего пользователя
  const [userData, setUserdata] = useState({
    email: '',
  });
  // Данные где находится пользователь
  const [buttonState, setButtonState] = useState('');
  // Данные для попапа о регистрации
  const [isRegistered, setRegisterState] = useState({
    state: false,
    message: '',
  });
  const history = useHistory();

  // Функция добавления карточки
  const handleAddPlaceSubmit = (cardData) => {
    api
      .uploadCard(cardData)
      .then((newCard) => {
        if(newCard.message) {
          return Promise.reject(`Ошибка: ${newCard.message}`)
        }
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        api.handleResponseError(res);
      });
  };

  // Функция поддержки лайков
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((res) => {
        api.handleResponseError(res);
      });
  };
  // Функция удаления карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((res) => {
        api.handleResponseError(res);
      });
  };

  // Обработчики открытия попапов
  const handleEditAvatarClick = () => {
    setPopupAvatarState(true);
  };
  const handleEditProfileClick = () => {
    setPopupProfileState(true);
  };
  const handleAddPlaceClick = () => {
    setPopupPlaceState(true);
  };
  // Функция закрытия попапов
  const closeAllPopups = () => {
    setPopupAvatarState(false);
    setPopupProfileState(false);
    setPopupPlaceState(false);
    setInfoTooltipState(false);
    setRegisterState({
      state: false,
      message: '',
    });
    setSelectedCard({});
  };
  const handleCardClick = (cardElement) => {
    setSelectedCard(cardElement);
  };
  // Обработчик кнопки редактирования аватара
  const handleEditAvatarOn = () => {
    setAvatarEditButton(true);
  };
  const handleEditAvatarOff = () => {
    setAvatarEditButton(false);
  };
  // Функция обновления инфо о юзере при сабмите
  const handleUpdateUser = (userData) => {
    api
      .updateUser(userData)
      .then((res) => {
        if(res.message) {
          return Promise.reject(res.message);
        }
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        api.handleResponseError(res);
      });
  };
  // Функция обновления аватара при сабмите
  const handleUpdateAvatar = (newAvatar) => {
    api
      .updateUserAvatar(newAvatar)
      .then((res) => {
        if(res.message) {
          return Promise.reject(res.message);
        }
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        api.handleResponseError(res);
      });
  };
  // Функция проверки наличия и валидности токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mestoAuth
        .getContent(jwt)
        .then((res) => {
          console.log(res);
          if (res.message) {
            setLoggedIn(false);
            setUserdata({
              email: '',
            });
            return Promise.reject(`Ошибка: ${res.message}`);
          }
          if (res.email) {
            setLoggedIn(true);
            setUserdata({
              email: res.email,
            });
            setCurrentUser(res);
            api.setToken(jwt);
            history.push('/');
          }
        })
        .catch((res) => {
          setRegisterState({
            state: false,
          });
        });
    }
  };
  // Функция регистрации
  const handleRegister = (email, password) => {
    mestoAuth
      .register(email, password)
      .then((res) => {
        if (res.message === 'celebrate request validation failed') {
          setRegisterState({
            state: false,
            message: `${res.validation.body.message}.`,
          });
          setInfoTooltipState(true);
          return Promise.reject(
            `Ошибка: ${res.validation.body.message}.`
          );
        } 
        else if 
        (res.error || res.message) {
          setRegisterState({
            state: false,
            message: `${res.error ? res.error : res.message}.`,
          });
          setInfoTooltipState(true);
          return Promise.reject(
            `Ошибка: ${res.error ? res.error : res.message}.`
          );
        }
        else {
          setRegisterState({
            state: true,
            message: 'Вы успешно зарегистрировались',
          });
          setInfoTooltipState(true);
          history.push('/sign-in');
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // Функция авторизации
  const handleLogin = (email, password) => {
    mestoAuth
      .authorize(email, password)
      .then((res) => {
        if (res.message) {
          setRegisterState({
            state: false,
            message: `${res.error ? res.error : res.message}.`,
          })
          setInfoTooltipState(true);
          return Promise.reject(`Ошибка: ${res.message}`);
        } else {
          localStorage.setItem('jwt', res.token);
          setCurrentUser(res);
          api.setToken(res.token);
          setLoggedIn(true);
          setUserdata({
            email: email,
          });
          history.push('/');
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // Функция выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUserdata({
      email: '',
    });
    setLoggedIn(false);
    setCurrentUser({});
  };

  // Изменение стейта регистрации

  const handleButtonState = (buttonState) => {
    setButtonState(buttonState);
  };

  // Функции переадресации для кнопок Вход и Регистрация и на Главную

  const pushToLogin = () => {
    history.push('/sign-in');
  };

  const pushToRegister = () => {
    history.push('/sign-up');
  };

  const returnToMainPage = () => {
    history.push('/');
  };
  React.useEffect(() => {
    tokenCheck();
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    setLoggedIn(true);
    api.setToken(token);
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      const promises = [api.getUser(), api.getInitialCards()];
      Promise.all(promises)
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((res) => {
          api.handleResponseError(res);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            buttonState={buttonState}
            userEmail={userData.email}
            handleLogout={handleLogout}
            pushToLogin={pushToLogin}
            pushToRegister={pushToRegister}
          />
          <Switch>
            <ProtectedRoute
              loggedIn={loggedIn}
              exact
              path="/"
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onMouseOnAvatar={handleEditAvatarOn}
              onMouseOffAvatar={handleEditAvatarOff}
              isAvatarButtonActive={isAvatarEditButtonActive}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <Login
                handleLogin={handleLogin}
                handleButtonState={handleButtonState}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                handleRegister={handleRegister}
                handleButtonState={handleButtonState}
              />
            </Route>
            <Route path="*">
              <PageNotFound onClick={returnToMainPage} />
            </Route>
          </Switch>
          <Footer />
        </div>
        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* Попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* Попап полноразмерного фото карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {/* Попап инфо о регистрации */}
        <InfoToolTip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          message={isRegistered.message}
          state={isRegistered.state}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
