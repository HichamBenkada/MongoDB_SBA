const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// Get all users
router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  // Create a new user
  .post(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering new user", error: error.message });
    }
  });

// Get users by id
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  // Update a user
  .patch(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(updatedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  // Delete a user
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
