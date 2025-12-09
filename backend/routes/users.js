const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

const {
  validateCreateUser,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
} = require('../middleware/validation');

const router = express.Router();

router.get('/', getUsers);

router.get('/:userId', validateUserId, getUserById);

router.post('/', validateCreateUser, createUser);

router.patch('/me', validateUpdateProfile, updateProfile);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
