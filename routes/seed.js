const express = require("express");

const router = express.Router();

//Models
const User = require("../models/User");
const Joke = require("../models/Joke");
const Comment = require("../models/Comment");

//Data Collection:
const data = require("../db/data");

//mongoDB Database seeding:
router.get("/", async (req, res) => {
  try {
    //inserting users collection
    await User.deleteMany({});
    data.users = await Promise.all(
      data.users.map(async (user) => {
        return new User({
          username: user.username,
          email: user.email,
          password: user.password,
        }).save();
      })
    );
    //  console.log("users after saved",data.users);//checked
    let userIds = await data.users.map((user) => user._id);
    //    console.log("users ids ",userIds);/checked

    //inserting joke collection
    await Joke.deleteMany({});
    data.jokes = await Promise.all(
        data.jokes.map((joke, index) =>  {
          return new Joke({
            title: joke.tag,
            content: joke.content,
            userId: userIds[Math.floor(Math.random()*userIds.length)],
          }).save();
        })
      );

    // await Post.insertMany(jokes);
    console.log("Past after saved",data.jokes)
    let jokeIds = await data.jokes.map((joke) => joke._id);
    
    console.log("post id after saved",jokeIds)

    //   await Comment.deleteMany({});

    console.log("data created");
    res.json({
      success: "JokesDB Collections are created and data successfully inserted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something went wrong:");
  }
});

module.exports = router;
