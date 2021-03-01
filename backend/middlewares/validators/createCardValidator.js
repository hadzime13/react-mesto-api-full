const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCardValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "Имя" - минимум 2 символа',
        'string.max': 'Поле "Имя" - максимум 30 символов',
        'any.required': 'Имя - обязательное поле',
      }),
    link: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Ссылка на картинку неверна');
      })
      .messages({
        'any.required': 'Необходима ссылка на картинку',
      }),
  },
});

module.exports = createCardValidator;
