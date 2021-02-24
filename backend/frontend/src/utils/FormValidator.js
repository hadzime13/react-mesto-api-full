class FormValidator {
  constructor(formClassNames, formElement) {
    this._formClassNames = formClassNames;
    this._formElement = formElement;
    this._inputElements = Array.from(formElement.querySelectorAll(formClassNames.inputSelector));
    this._submitButton = formElement.querySelector(formClassNames.submitButtonSelector);
  };
  // Публичный метод - валидация формы
  enableValidation() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { this._handleInput(inputElement, this._formClassNames) });
    });

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._formElement.addEventListener('input', () => { this._toggleButtonState() })
  };
  // Публичный метод - сброс ошибок, состояния кнопки
  resetFormValidation() {
    this._inputElements.forEach((input) => {
      this._hideErrors(input, this._formElement.querySelector(`#${input.id}-error`), this._formClassNames);
      this._toggleButtonState();
    });
  }
  // Приватный метод - переключениe состояния кнопки на форме

  _toggleButtonState() {
    const hasErrors = !this._formElement.checkValidity();
    this._submitButton.disabled = hasErrors;
    this._submitButton.classList.toggle(
      this._formClassNames.inactiveButtonClass,
      hasErrors
    );
  };

  // Приватный метод - обработка инпутов на форме
  _handleInput(inputElement) {
    const error = document.querySelector(`#${inputElement.id}-error`);
    this._isValid(inputElement, error, this._formClassNames);
  };

  // Приватный метод - проверка на валидность
  _isValid(inputElement, error) {
    if (inputElement.checkValidity()) {
      this._hideErrors(inputElement, error);
    }
    else {
      this._showErrors(inputElement, error);
    }
  };

  // Приватный метод - скрытие ошибок
  _hideErrors(inputElement, error) {
    inputElement.classList.remove(this._formClassNames.inputErrorClass);
    error.classList.remove(this._formClassNames.errorClass);
    error.textContent = '';
  };

  // Приватный метод - показ ошибок
  _showErrors(inputElement, error) {
    inputElement.classList.add(this._formClassNames.inputErrorClass);
    error.classList.add(this._formClassNames.errorClass);
    error.textContent = inputElement.validationMessage;
  };
}

export default FormValidator;