const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;

// Función helper para centralizar el manejo de errores de tarjetas
const handleCardError = (err, res) => {
  // Errores de validación de Mongoose (schema inválido)
  if (err.name === 'ValidationError') {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'Datos inválidos para crear tarjeta' });
  }
  // CastError → IDs de Mongo mal formados
  if (err.name === 'CastError') {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'ID de tarjeta inválido' });
  }
  // Errores manuales con statusCode = 404
  if (err.statusCode === NOT_FOUND) {
    return res
      .status(NOT_FOUND)
      .send({ message: err.message || 'Tarjeta no encontrada' });
  }
  // Cualquier otra cosa → error 500
  console.error(err);
  return res
    .status(DEFAULT_ERROR)
    .send({ message: 'Error interno del servidor' });
};

// GET /cards → todas las tarjetas
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return handleCardError(err, res);
  }
};

// POST /cards → crea una nueva tarjeta
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: req.user._id, // owner viene del middleware temporal
    });

    return res.status(201).send(card);
  } catch (err) {
    return handleCardError(err, res);
  }
};

// DELETE /cards/:cardId → elimina una tarjeta
module.exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = NOT_FOUND;
      throw error;
    });

    await card.deleteOne();

    return res.send({ message: 'Tarjeta eliminada correctamente' });
  } catch (err) {
    return handleCardError(err, res);
  }
};

// PUT /cards/:cardId/likes → dar like a una tarjeta
module.exports.likeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }

    return res.send(updatedCard);
  } catch (err) {
    return next(err);
  }
};

// DELETE /cards/:cardId/likes → quitar like a una tarjeta
module.exports.dislikeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }

    return res.send(updatedCard);
  } catch (err) {
    return next(err);
  }
};
