import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, cardElement, onCardLike, onCardDelete }) {
  const handleCLick = () => {
    onCardClick(cardElement);
  };

  const handleLikeClick = () => {
    onCardLike(cardElement);
  }

  const handleDeleteClick = () => {
    onCardDelete(cardElement);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const cardDeleteButtonClassName = (`photo-elements__delete-btn ${currentUser._id !== cardElement.owner._id ? 'photo-elements__delete-btn_inactive' : ''}`);
  const isLiked = cardElement.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (`photo-elements__like ${isLiked ? 'photo-elements__like_active' : ''}`)

  return (
    (<li className="photo-elements__list-item">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="photo-elements__image" src={cardElement.link} alt={cardElement.name} onClick={handleCLick} />
      <h2 className="photo-elements__name">{cardElement.name}</h2>
      <div className="photo-elements__like-wrapper">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <span className="photo-elements__like-span">{cardElement.likes.length}</span>
      </div>
    </li>)
  );
};

export default Card;