const express = require("express");
const router = express.Router();
const posts = require("../data/posts.json");
const fs = require("fs");
const path = require("path");

const postsFile = path.join(__dirname, "../data/posts.json");

// GET all posts
router.get("/", (req, res) => {
    res.json(posts);
});

// GET single post by id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.json(post);
});

// POST new post
router.post("/", (req, res) => {
    const { title, author, content } = req.body;

    const newPost = {
        id: posts.length + 1,
        title,
        author,
        content
    };

    posts.push(newPost);

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

    res.status(201).json(newPost);
});

// PUT update post
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

    res.json(post);
});

//Delete a post
router.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id);

    const postIndex = posts.findIndex((post)=> post.id===id);

    if(postIndex=== -1){
        return res.status(404).json({
            msessage:"post not found"
        });
    }

    posts.splice(postIndex,1);

    fs.writeFileSync(
        postsFile,
        JSON.stringify(posts,null,2)
    );

    res.json({
        msessage:"post deleted successfully"
    });
});

module.exports = router;