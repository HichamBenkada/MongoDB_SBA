const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment')

// Get all comments
router
  .route("/")
  .get(async (req, res) => {
    try {
      const comments = await Comment.find({});
      res.json(comments);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  // Create a new comment
  .post(async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      await newComment.save();
      res.status(201).send(newComment);
    } catch (error) {
      res.status(400).send(error);
    }
  });

//Get comment by id
router
  .route("/:id")
  .get(async (req, res) => {
    // console.log("line 16",req.params)
    try {
      const commentId = await Comment.findById(req.params.id);
      console.log("line 16", commentId);
      res.json(commentId);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  // Update a comment
  .patch(async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).send({ message: "Comment not found" });
      }
      res.send(updatedComment);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  // Delete a comment
  .delete(async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      if (!deletedComment) {
        return res.status(404).send({ message: "Comment not found" });
      }
      res.send({ message: "Comment deleted successfully", deletedComment });
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get(":/userId", async (req, res) => {
  try {
    //user id
    const userId = req.params.userId;
    const userComments = await Comment.find({ author: userId }).populate(
      "author"
    );
    console.log(userComments);
    if (!userComments || userComments.length === 0) {
      return res
        .status(404)
        .send({ message: `No post found with giving user id` });
    }
    res.json(userComments);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
