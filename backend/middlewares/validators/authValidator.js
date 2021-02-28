const { celebrate, Joi } = require('celebrate');

const authValidator = celebrate({
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
  },
});

module.exports = authValidator;
