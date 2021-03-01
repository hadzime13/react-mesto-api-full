const usersRouter = require('express').Router();
const idValidator = require('../middlewares/validators/idValidator');
const {
  userUpdateValidator,
  avatarUpdateValidator,
} = require('../middlewares/validators/updateValidator');

const {
  getUsers,
  updateUser,
  updateAvatar,
  getUser,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
// валидируется
usersRouter.get('/:id', idValidator, getUser);
// валидируется
usersRouter.patch('/me', userUpdateValidator, updateUser);
// валидируется
usersRouter.patch('/me/avatar', avatarUpdateValidator, updateAvatar);

module.exports = usersRouter;
