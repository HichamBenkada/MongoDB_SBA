const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 4,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});


// Before saving a user to the database, hash the password
userSchema.pre('save', async function (next) {
  const user = this;
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    // Replace the plain password with the hashed one
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

//Email validation:
userSchema.path("email").validate(function (email) {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
}, "The email is not valid.");

//UserName as index
userSchema.index({ username: 1 });


const User = mongoose.model("User", userSchema);
module.exports = User;
