const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const userValidator = celebrate({
  body: {
    email: Joi.string().email().required({ minDomainSegments: 2 }).messages({
      'string.email': 'Невалидный email',
      'any.required': 'Email - обязательное поле',
    }),
    password: Joi.string().min(6).max(30).required()
      .messages({
        'string.min': 'Поле "Пароль" - минимум 6 символов',
        'string.max': 'Поле "Пароль" - максимум 30 символов',
        'any.required': 'Пароль - обязательное поле',
      }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "Имя" - минимум 2 символа',
      'string.max': 'Поле "Имя" - максимум 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "О себе" - минимум 2 символа',
      'string.max': 'Поле "О себе" - максимум 30 символов',
    }),
    avatar: Joi.string()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Аватар должен быть ссылкой');
      })

      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
  },
});

module.exports = userValidator;
