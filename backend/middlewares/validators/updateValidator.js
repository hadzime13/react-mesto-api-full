const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const userUpdateValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Поле "Имя" - минимум 2 символа',
      'string.max': 'Поле "Имя" - максимум 30 символов',
      'any.required': 'Имя - обязательное поле'
    }),
    about: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Поле "О себе" - минимум 2 символа',
      'string.max': 'Поле "О себе" - максимум 30 символов',
      'any.required': 'О себе - обязательное поле'
    }),
  },
});

const avatarUpdateValidator = celebrate({
  body: {
    avatar: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Аватар должен быть ссылкой');
      })

      .messages({
        'any.required': 'Необходима ссылка на аватар',
      }),
  },
});

module.exports = {
  userUpdateValidator,
  avatarUpdateValidator,
};
