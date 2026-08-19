const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const path = require("path");


// GET all posts
router.get("/",async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(error) {
        res.status(500).json({
            message:"Failed to fetch posts"
        });
    }
});

// GET single post by Mongodb id
router.get("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                    message:"Post not found"
                });
            }
                res.json(post);
        } catch (error){
            res.status(500).json({
                message:"Failed to fetch post",
                error:error.message
            });
    }
    
});

// POST new post
router.post("/", async(req, res) => {
    try{
    const { title, author, content } = req.body;

    const newPost = new Post({
        title,
        author,
        content
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
}catch(error) {
    res.status(500).json({
        message:"Failed to create post",
        error:error.message
    });
}
})

// PUT update post
router.put("/:id", async(req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title:req.body.title,
                author:req.body.author,
                content:req.body.content
            },
        {
            new:true,
            runValidators:true
        }
        );
    if(!post){
        return res.status(404).json({
            message:"post not found"
        });
    }
    res.json(post);
    } catch (error){
        res.status(500).json({
            message:"failed to update post",
            error:erro.message
        });
    }
});

//Delete a post
router.delete("/:id",async(req,res)=>{
    try{
        const post = await this.post.findByIdDelete(req.params.id);
        if(!post){
            return res.status(404).json({
                message:"post not found"
            });
        }
        res.json({
            message:"Post deleted successfully"
        });

    } catch (error){
        res.status(500).json({
            message:"post deleted successfully"
        });
    }
});

module.exports = router;