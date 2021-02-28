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
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
// валидируется
usersRouter.patch('/me', userUpdateValidator, updateUser);
// валидируется
usersRouter.patch('/me/avatar', avatarUpdateValidator, updateAvatar);

module.exports = usersRouter;
