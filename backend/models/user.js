const mongoose = require('mongoose');
const validator = require('validator');
const urlRegex = require('./validators/urlRegex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(value) {
        return urlRegex.test(value);
      },
      message: 'El campo avatar debe ser una URL válida',
    },
  },

  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'El email no es válido',
    },
  },

  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
