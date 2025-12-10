const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

const { JWT_SECRET = 'dev-secret' } = process.env;

// GET /users
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

// GET /users/:userId
module.exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    });

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

// POST /signup  (antes POST /users)
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    return next(err);
  }
};

// PATCH /users/me
module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
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
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    }

    return res.send(updatedUser);
  } catch (err) {
    return next(err);
  }
};

// POST /signin
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('Correo o contraseña incorrectos');
      error.statusCode = UNAUTHORIZED;
      throw error;
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      const error = new Error('Correo o contraseña incorrectos');
      error.statusCode = UNAUTHORIZED;
      throw error;
    }

    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

// GET /users/me
module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      throw error;
    }

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};
