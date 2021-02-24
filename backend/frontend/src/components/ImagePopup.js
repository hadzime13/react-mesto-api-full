import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_photo ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__photo-container">
        <button type="reset" aria-label="Закрыть" className="popup__close-btn" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__photo-name">
          {card.name}
        </h3>
      </div>
    </section>
  );
};

export default ImagePopup;