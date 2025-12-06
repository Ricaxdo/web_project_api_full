const express = require('express');
const {
  getUsers, getUserById, createUser, updateAvatar, updateProfile,
} = require('../controllers/users');

const router = express.Router();

// GET /users → devuelve todos los usuarios
router.get('/', getUsers);

// GET /users/:userId → devuelve un usuario por ID
router.get('/:userId', getUserById);

// POST /users → crea un usuario nuevo
router.post('/', createUser);

// PATCH /users/me → actualiza el perfil del usuario
router.patch('/me', updateProfile);

// PATCH /users/me/avatar → actualiza el avatar del usuario
router.patch('/me/avatar', updateAvatar);

module.exports = router;
