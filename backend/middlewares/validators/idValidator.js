const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const idValidator = celebrate({
  params: {
    id: Joi.string().custom((value, helper) => {
      if (validator.isMongoId(value)) {
        return value;
      }
      return helper.message('Неверный ID');
    }),
    cardID: Joi.string().custom((value, helper) => {
      if (validator.isMongoId(value)) {
        return value;
      }
      return helper.message('Неверный ID');
    }),
  },
});

module.exports = idValidator;
