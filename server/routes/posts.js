const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Fetch posts from MongoDB
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();  
    res.status(200).json({ data: { posts } });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = router;
