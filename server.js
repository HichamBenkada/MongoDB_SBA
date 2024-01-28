const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5050;

//Connecting to JokesDB
mongoose.connect(process.env.ATLAS_URI);
// Check for successful connection
mongoose.connection
.on("error", console.error.bind(console, "MongoDB connection error:"))
.once("open", () => {
  console.log(`Server is connected to ${mongoose.connection.name}`)
});

//Routes
const jokes = require('./routes/jokes');
const users = require('./routes/users');
const comments = require('./routes/comments');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api/jokes', jokes);
app.use('/api/users', users);
app.use('/api/comments', comments);

app.get("/seed", async (req, res) => {
  try {
    const User = require('./models/User')
    await User.deleteMany({}) 
    await User.insertMany([
          { "username": 'user1', "email": 'user1@example.com', "password": 'password123' },
    { "username": 'user2', "email": 'user2@example.com', "password": 'password234' },
    { "username": 'user3', "email": 'user3@example.com', "password": 'password3456' },
    { "username": 'user4', "email": 'user4@example.com', "password": 'password456' },
    { "username": 'user5', "email": 'user5@example.com', "password": 'password557' },
    { "username": 'user6', "email": 'user6@example.com', "password": 'password678' },
    { "username": 'user7', "email": 'user7@example.com', "password": 'password789' },
    { "username": 'user8', "email": 'user8@example.com', "password": 'password890' },
    { "username": 'user9', "email": 'user9@example.com', "password": 'password901' },
    { "username": 'user10', "email": 'user10@example.com', "password": 'password902' },
    { "username": 'user11', "email": 'user11@example.com', "password": 'password903' },
    { "username": 'user12', "email": 'user12@example.com', "password": 'password904' },
    { "username": 'user13', "email": 'user13@example.com', "password": 'password905' },
    { "username": 'user14', "email": 'user14@example.com', "password": 'password906' },
    { "username": 'user15', "email": 'user15@example.com', "password": 'password907' },
    { "username": 'user16', "email": 'user16@example.com', "password": 'password908' },
    { "username": 'user17', "email": 'user17@example.com', "password": 'password909' },
    { "username": 'user18', "email": 'user18@example.com', "password": 'password911' },
    { "username": 'user19', "email": 'user19@example.com', "password": 'password912' },
    { "username": 'user20', "email": 'user20@example.com', "password": 'password913' }])
    console.log('data created')
    res.json({success: "'users' Collection is created and data successfully inserted"})
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Something went wrong:")
  }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});