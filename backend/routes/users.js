const usersRouter = require('express').Router();
const {
  getUsers,
  updateUser,
  updateAvatar,
  getUser,
} = require('../controllers/users');


usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
