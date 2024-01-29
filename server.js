const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;

//Connecting to JokesDB
mongoose.connect(process.env.ATLAS_URI);
// Check for successful connection
mongoose.connection
  .on("error", console.error.bind(console, "MongoDB connection error:"))
  .once("open", () => {
    console.log(`Server is connected to ${mongoose.connection.name}`);
  });

//Routes
const jokes = require("./routes/jokes");
const users = require("./routes/users");
const comments = require("./routes/comments");
const seed = require("./routes/seed");

//parseIn Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Logger Middleware
app.use((req, res, next) => {
  const time = new Date();
  console.log( `-----
    ${time.toLocaleTimeString()}: A ${req.method} '${req.url}' request has been received.`);

  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

//Generate the Jokes DataBase : http://localhost:5050/seed

//Route redirection:
app.use("/seed", seed);
app.use("/api/jokes", jokes);
app.use("/api/users", users);
app.use("/api/comments", comments);

// if page not found:
app.use((req, res) => {
  res.status(404).send("Oops! item not found");
});
//Server Running:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});