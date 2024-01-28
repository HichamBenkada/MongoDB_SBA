const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    } ,   
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Not a valide email']
    },
    password:{
        type: String,
        required: true
    }
  },{timestamps:true
});

  userSchema.index({username:1});

  const User = mongoose.model('User', userSchema );
  module.exports = User;