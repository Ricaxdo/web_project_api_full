const mongoose = require('mongoose');
const urlRegex = require('./validators/urlRegex'); // <-- tu archivo

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return urlRegex.test(value);
      },
      message: 'El campo avatar debe ser una URL válida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
