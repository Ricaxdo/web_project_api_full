const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;

// Helper para centralizar errores de usuarios
const handleUserError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'Datos inválidos para crear/actualizar usuario' });
  }

  if (err.name === 'CastError') {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'ID de usuario inválido' });
  }

  if (err.statusCode === NOT_FOUND) {
    return res
      .status(NOT_FOUND)
      .send({ message: err.message || 'Usuario no encontrado' });
  }

  console.error(err);
  return res
    .status(DEFAULT_ERROR)
    .send({ message: 'Error interno del servidor' });
};

// GET /users
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return handleUserError(err, res);
  }
};

// GET /users/:userId
module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    });

    return res.send(user);
  } catch (err) {
    return handleUserError(err, res);
  }
};

// POST /users
module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.status(201).send(newUser);
  } catch (err) {
    return handleUserError(err, res);
  }
};

// PATCH /users/me
module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    return res.send(updatedUser);
  } catch (err) {
    return next(err);
  }
};

// PATCH /users/me/avatar
module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    return res.send(updatedUser);
  } catch (err) {
    return next(err);
  }
};
