const express = require('express');
const {
  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
} = require('../middleware/validation');

const router = express.Router();

// GET /users → devuelve todos los usuarios
router.get('/', getUsers);

// GET /users/me → devuelve el usuario actual
router.get('/me', getCurrentUser);

// GET /users/:userId → devuelve un usuario por ID
router.get('/:userId', validateUserId, getUserById);

// PATCH /users/me → actualiza el perfil del usuario
router.patch('/me', validateUpdateProfile, updateProfile);

// PATCH /users/me/avatar → actualiza el avatar del usuario
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
