const mongoose =require('mongoose');

const commentSchema = new mongoose.Schema({

    author: 
    {type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, 
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }, 
    content: {
      type: String,
      required: true
    },
   
  },{timestamps:true
  });
  const Comment = mongoose.model('Comment', commentSchema );
  module.exports = Comment;

//65b56d4fe78c1f21830bd049
//65b56ecd8b10506d91c4e037
//65b570700008aa6c41a30bdf

// {
//   "content": "This is a comment.",
//   "author": "65b570700008aa6c41a30bdf", 
//   "post": "65b56a3fbfd701887eb8f6cc" 
// }