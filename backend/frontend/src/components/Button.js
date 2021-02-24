import React from 'react';
import './styles/Button.css';

function Button({ onClick, buttonText }) {
  return (
    <button
      type="button"
      aria-label="Войти"
      className="button"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export { Button };
