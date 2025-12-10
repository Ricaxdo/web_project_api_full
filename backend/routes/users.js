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

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validateUpdateProfile, updateProfile);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
