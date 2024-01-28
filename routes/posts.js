const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.route('/')
.get(async (req, res) => {
    try {
        const posts = await Post.find({}).limit(10);
        res.json(posts);
    } catch (error) {
        res.status(500).send(error);
    }
})
.post( async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(error);
    }
});
//posts by id
router.route('/:id')
.get(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).send(error);
    }
})
.put( async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found'});
        }
        res.send(updatedPost);
    } catch (error) {
        res.status(400).send(error);
    }
})
.delete( async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).send({ message: 'Post not found'});
        }
        res.send({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get posts by userID
router.get('/:userId', async(req,res)=>{
    try{
       //user id
       const userId = req.params.userId;
       const userPosst = await Post.find({author: userId})
       if(!userPosst || userPosst.length ===0){
        return res.status(404).send({message:`No post found with giving user id`})
       }
       res.json(userPosst);
    }catch(error){
        res.status(500).send(error)
    }
})


module.exports = router;