const Card = require('../models/card');

const NOT_FOUND = 404;
const FORBIDDEN = 403;

// GET /cards → todas las tarjetas
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

// POST /cards → crea una nueva tarjeta
module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });

    return res.status(201).send(card);
  } catch (err) {
    return next(err);
  }
};

// DELETE /cards/:cardId → elimina una tarjeta
module.exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = NOT_FOUND;
      throw error;
    });

    // Verificar que el usuario actual es el propietario de la tarjeta
    if (card.owner.toString() !== req.user._id) {
      const error = new Error('No tienes permiso para borrar esta tarjeta');
      error.statusCode = FORBIDDEN;
      throw error;
    }

    await card.deleteOne();

    return res.send({ message: 'Tarjeta eliminada correctamente' });
  } catch (err) {
    return next(err);
  }
};

// PUT /cards/:cardId/likes → dar like a una tarjeta
module.exports.likeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
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
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }

    return res.send(updatedCard);
  } catch (err) {
    return next(err);
  }
};
