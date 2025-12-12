const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateCardId,
} = require('../middleware/validation');

const router = express.Router();

// GET /cards → devuelve todas las tarjetas
router.get('/', getCards);

// POST /cards → crea una nueva tarjeta
router.post('/', validateCreateCard, createCard);

// PUT /cards/:cardId/likes → dar like a una tarjeta
router.put('/:cardId/likes', validateCardId, likeCard);

// DELETE /cards/:cardId/likes → quitar like a una tarjeta
router.delete('/:cardId/likes', validateCardId, dislikeCard);

// DELETE /cards/:cardId → elimina una tarjeta por ID
router.delete('/:cardId', validateCardId, deleteCard);

module.exports = router;
