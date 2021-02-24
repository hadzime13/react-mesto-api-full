const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFound,
  BadRequest,
  Conflict,
  Unauthorized,
} = require('../errors/index');
const { JWT_SECRET, JWT_TTL } = require('../config/index');

// Контроллер аутентификации
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверное имя пользователя или пароль');
      }
      return bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new Unauthorized('Неверное имя пользователя или пароль');
        })
        .then((loggedUser) => {
          const token = jwt.sign({ _id: loggedUser._id }, JWT_SECRET, {
            expiresIn: JWT_TTL,
          });
          res.send({ token });
        });
    })

    .catch((err) => next(err));
};

// Контроллеры для пользователей
// Получаем всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

// Создаем пользователя
const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Email уже используется');
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            email,
            password: hash,
            name,
            about,
            avatar,
          })
        )
        .then((regUSer) => {
          res.send({
            _id: regUSer._id,
            email: regUSer.email,
            name: regUSer.name,
            about: regUSer.about,
            avatar: regUSer.avatar,
          });
        });
    })
    .catch((err) => next(err));
};
//
// Получаем пользователя по id
const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFound('Пользователь не найден');
    })
    .catch((err) => {
      next(err);
    });
};

// Обновляем профиль
const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new BadRequest('Некорректные данные пользователя');
    })
    .catch((err) => next(err));
};

// Обновляем аватар
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new BadRequest('Некорректные данные пользователя');
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  updateUser,
  updateAvatar,
  createUser,
  getUser,
  login,
};
