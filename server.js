const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5050;

//Routes
const connectDB = require('./confid/db');
const posts = require('./routes/posts');
const users = require('./routes/users');
const comments = require('./routes/comments');


// Connect to the database
connectDB();  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/comments', comments);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});