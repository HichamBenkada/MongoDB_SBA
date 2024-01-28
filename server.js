const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5050;

//Connecting to JokesDB
mongoose.connect(process.env.ATLAS_URI);
// Check for successful connection
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connection.once("open", () => {
  console.log(`Server is connected to ${mongoose.connection.name}`)
});

//Routes
const posts = require('./routes/posts');
const users = require('./routes/users');
const comments = require('./routes/comments');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/comments', comments);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});