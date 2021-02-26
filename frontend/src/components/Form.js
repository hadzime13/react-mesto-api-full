import React from 'react';
import './styles/Form.css';

const Form = ({ title, buttonText, onSubmit, children }) => {
  return (
    <form
      action="#"
      method="POST"
      onSubmit={onSubmit}
      className="form__container"
    >
      <h2 className="form__header">{title}</h2>
      <fieldset className="form__fieldset">
        {children}
        <button type="submit" className="form__button">
          {buttonText}
        </button>
      </fieldset>
    </form>
  );
};

export default Form;
