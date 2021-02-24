import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatarEdit from '../images/Vector.svg';
import Card from './Card';

const Main = React.memo(
  ({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onMouseOnAvatar,
    onMouseOffAvatar,
    isAvatarButtonActive,
    onCardClick,
    onCardLike,
    onCardDelete,
  }) => {
    // Стейт пользователя
    const currentUser = React.useContext(CurrentUserContext);
    return (
      <main className="content">
        <section className="profile section section_standard">
          <div className="profile__overlay">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              onMouseEnter={onMouseOnAvatar}
              onMouseLeave={onMouseOffAvatar}
              onClick={onEditAvatar}
            >
              <img
                src={avatarEdit}
                alt="Изменить аватар"
                className={`profile__avatar-edit-btn ${
                  isAvatarButtonActive && 'profile__avatar-edit-btn_active'
                }`}
              />
            </div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактировать"
              className="profile__edit-btn"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__add-btn"
            onClick={onAddPlace}
          ></button>
        </section>

        <section
          className="photo-elements section section_standard"
          aria-label="Места"
        >
          <ul className="photo-elements__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                cardElement={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    );
  }
);

export default Main;
