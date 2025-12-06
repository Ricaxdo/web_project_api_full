const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const router = express.Router();

// GET /cards → devuelve todas las tarjetas
router.get('/', getCards);

// POST /cards → crea una nueva tarjeta
router.post('/', createCard);

// PUT /cards/:cardId/likes → dar like a una tarjeta
router.put('/:cardId/likes', likeCard);

// DELETE /cards/:cardId/likes → quitar like a una tarjeta
router.delete('/:cardId/likes', dislikeCard);

// DELETE /cards/:cardId → elimina una tarjeta por ID
router.delete('/:cardId', deleteCard);

module.exports = router;
