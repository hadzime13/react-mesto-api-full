import React from 'react';
import imageSuccess from '../images/Union_ok.svg';
import imageFail from '../images/Union_fail.svg';

const InfoToolTip = ({ onClose, message, isOpen, state }) => {
  return (
    <section className={`popup popup_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="reset"
          aria-label="Закрыть"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <img src={state ? imageSuccess : imageFail} alt={message} className="popup__info-image" />
        <h3 className="popup__message">{state ? message : `${message} \n Попробуйте еще раз.`}</h3>
      </div>
    </section>
  );
};

export { InfoToolTip };
