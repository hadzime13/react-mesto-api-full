const mongoose = require('mongoose');
const Card = require('../models/card');
const { BadRequest, NotFound, Forbidden } = require('../errors/index');

// Контроллеры для карточек
// Получаем все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

// Создаем карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))

    .catch(() => next(new BadRequest('Некорректные данные карточки')));
};

// Удаляем карточку
const deleteCard = (req, res, next) => {
  const cardID = req.params.id;
  Card.findById(cardID)
    .then((card) => {
      if (!mongoose.isValidObjectId(cardID)) {
        throw new BadRequest('Неверный формат ID карточки');
      }
      if (!card) {
        throw new NotFound('Карточки с таким ID не существует');
      }
      if (String(card.owner) !== req.user._id) {
        throw new Forbidden(
          'В удалении карточки другого пользователя отказано',
        );
      }
      return Card.findByIdAndRemove(cardID).then(() => res.send({ message: 'Карточка удалена успешно' }));
    })
    .catch((err) => next(err));
};

// Ставим лайк
const likeCard = (req, res, next) => {
  const { cardID } = req.params;
  if (!mongoose.isValidObjectId(cardID)) {
    throw new BadRequest('Неверный формат ID карточки');
  }
  Card.findByIdAndUpdate(
    cardID,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки с таким ID не существует');
      }
      return res.send(card);
    })
    .catch((err) => next(err));
};

// Удаляем лайк
const dislikeCard = (req, res, next) => {
  const { cardID } = req.params;
  if (!mongoose.isValidObjectId(cardID)) {
    throw new BadRequest('Неверный формат ID карточки');
  }
  Card.findByIdAndUpdate(
    cardID,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточки с таким ID не существует');
      }
      return res.send(card);
    })
    .catch((err) => next(err));
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
