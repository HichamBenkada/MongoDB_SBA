const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

// Get users by id
router.get('/:id', userController.getUserById);

// Update a user
router.patch('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
