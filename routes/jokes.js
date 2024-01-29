const express = require("express");
const router = express.Router();
const Joke = require("../models/Joke");

router
  .route("/")
  //GET all jokes posts
  .get(async (req, res) => {
    try {
      const jokes = await Joke.find({});
      res.json(jokes);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  //Post a joke
  .post(async (req, res) => {
    try {
      const newJoke = new Joke(req.body);
      await newJoke.save();
      res.status(201).send(newJoke);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
//jokes by id
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const joke = await Joke.findById(req.params.id);
      if (!joke) {
        return res.status(404).send({ message: "joke not found" });
      }
      res.json(joke);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  //update a joke
  .put(async (req, res) => {
    try {
      const updatedJoke = await Joke.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedJoke) {
        return res.status(404).send({ message: "joke not found" });
      }
      res.send(updatedJoke);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedJoke = await Joke.findByIdAndDelete(req.params.id);
      if (!deletedJoke) {
        return res.status(404).send({ message: "Joke not found" });
      }
      res.send({ message: "Joke deleted successfully", deletedJoke });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

//Get jokes by userID
router.get("/:userId", async (req, res) => {
  try {
    const userJokes = await Joke.find({ userId: req.params.userId });
    if (!userJokes || userJokes.length === 0) {
      return res
        .status(404)
        .send({ message: `No joke found with giving user id` });
    }
    res.json(userJokes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
