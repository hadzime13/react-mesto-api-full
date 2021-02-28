const registerRouter = require('express').Router();
const userValidator = require('../middlewares/validators/userValidator');
const { createUser } = require('../controllers/users');

// валидируется
registerRouter.post('/', userValidator, createUser);

module.exports =  registerRouter;
