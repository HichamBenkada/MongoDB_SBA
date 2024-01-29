const mongoose =require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        minLength: 1,
    },
    content:{
        type: String,
        required: true
    },
    userId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  createdAt: {
    type:Date,
    immutable:true,
    default: () => Date.now()
  },
  updatedAt:{
    type:Date,
    default: () => Date.now()
  }
});

const Joke = mongoose.model('Post', postSchema );

module.exports = Joke;
