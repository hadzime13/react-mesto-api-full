const loginRouter = require('express').Router();
const { login } = require('../controllers/users');

loginRouter.post('/', login);

module.exports = loginRouter;
