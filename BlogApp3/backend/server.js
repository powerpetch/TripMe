import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB, connectUserDB } from "./config/db.js";

import upload from "./config/multer.js";

import {
  chatAi,
  createPost,
  deletePost,
  getAllPosts,
  getByCountry,
  getComment,
  getLike,
  getPostByName,
  getPostsByUsername,
  getProfile,
  getTopPost,
  getUserByName,
  postComment,
  postLike,
} from "./routes/post.router.js";
import authMiddleware from "./middleware/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// create a post wxith username and userid
app.post("/api/posts", upload.single("image"), authMiddleware, createPost);

//post a comment and record the post id to identify which post does it belongs to
app.post("/api/posts/comment/:postID", authMiddleware, postComment);

// get post by name
app.get("/api/posts/byname", authMiddleware, getPostByName);

// get user profile
app.get("/api/profile", authMiddleware, getProfile);

// post a like
app.post("/api/posts/like/:pid", authMiddleware, postLike);

app.get("/api/posts/like/:pid", authMiddleware, getLike);

// get all post
app.get("/api/posts", getAllPosts);

//delete post
app.delete("/api/posts/:id", deletePost);

//get famous location from mistral ai/
app.get("/api/posts/ai/:location/:duration", chatAi);

// get all comments
app.get("/api/posts/comment/:pid", getComment);

// get top three post
app.get("/api/posts/pop", getTopPost);

// get post by country
app.get("/api/posts/:country", getByCountry);

//get user by username
app.get("/api/user/:username", getUserByName);

//get post by username
app.get("/api/posts/find/:username", getPostsByUsername);

app.listen(PORT, () => {
  console.log("Connecting to MongoDB...");
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
