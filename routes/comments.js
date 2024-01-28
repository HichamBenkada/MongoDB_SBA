const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Get all comments
router.get('/', commentController.getAllComments);

// Create a new comment
router.post('/', commentController.createComment);

//Get comment by id
router.get('/:id',commentController.getCommentById);

// Update a comment
router.patch('/:id', commentController.updateComment);

// Delete a comment
router.delete('/:id', commentController.deleteComment);

router.get(':/userId', commentController.getCommentsByUserId)


module.exports = router;