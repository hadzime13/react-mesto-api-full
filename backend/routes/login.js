const loginRouter = require('express').Router();
const { login } = require('../controllers/users');
const authValidator = require('../middlewares/validators/authValidator');
// валидируется
loginRouter.post('/', authValidator, login);

module.exports = loginRouter;
