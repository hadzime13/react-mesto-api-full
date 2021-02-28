const cardsRouter = require('express').Router();
const createCardValidator = require('../middlewares/validators/createCardValidator');
const idValidator = require('../middlewares/validators/idValidator')
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
// валидируется
cardsRouter.post('/', createCardValidator, createCard);

cardsRouter.delete('/:id',idValidator, deleteCard);
cardsRouter.put('/:cardID/likes',idValidator, likeCard);
cardsRouter.delete('/:cardID/likes',idValidator, dislikeCard);

module.exports = cardsRouter;
