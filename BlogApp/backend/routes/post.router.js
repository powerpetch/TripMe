import mongoose from "mongoose";
import Post from "../model/post.model.js";
import cloudinary from "../config/cloudinary.js";
import fetch from "node-fetch";
import User from "../model/user.model.js";

export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  const username = req.username;
  const avatar = req.avatar;
  const userID = req.userId;
  console.log(userID);
  // Check if required fields are provided
  if (!post.country || !post.content) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields!" });
  }

  // Check if a file was uploaded
  let imageURL = "";
  if (req.file) {
    const upload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "posts", // Optional folder in Cloudinary
            resource_type: "auto", // Automatically detect the resource type
          },
          (error, result) => {
            if (error) {
              reject(new Error("Cloudinary upload failed: " + error.message));
            } else {
              resolve(result.secure_url); // Resolve the URL from Cloudinary
            }
          }
        );
        stream.end(req.file.buffer); // Use file buffer for Cloudinary upload
      });
    };

    try {
      imageURL = await upload(); // Await the image URL from Cloudinary upload
      console.log("Image URL: ", imageURL); // Optional: Log the image URL
    } catch (error) {
      console.error("Upload failed:", error); // Log the error if upload fails
      return res.status(500).json({
        success: false,
        message: "File upload failed",
        error: error.message,
      });
    }
  }

  const newPost = new Post({
    // from middleare
    userID: userID,
    name: username,
    avatar: avatar,
    // from body
    country: post.country,
    content: post.content,
    image: imageURL, // Save the image URL to the post
  });

  try {
    await newPost.save();
    res
      .status(200)
      .json({ success: true, message: "Post created", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    //find in posts collection
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: { posts } });
  } catch (error) {
    console.log("Error on fetching all posts");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPostByName = async (req, res) => {
  try {
    const postName = req.userId;
    const posts = (await Post.find()).filter(
      (posts) => postName === posts.userID
    );
    res.status(200).json({ success: true, data: { posts } });
  } catch (error) {
    console.log("That person have no post");
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deletePost = async (req, res) => {
  const postID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(postID)) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Product ID" });
  }
  try {
    await Post.findByIdAndDelete(postID);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log("Error in deleting post", error.message);
    res.status(500).json({ sucess: false, message: "server Errorx" });
  }
};

export const chatAi = async (req, res) => {
  const location = req.params.location;
  const duration = req.params.duration;
  // console.log(location)
  try {
    const out = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `trip plan for ${location} for ${duration} days. Without introduction`,
        stream: false,
      }),
    });

    if (!out.ok) {
      throw new Error(`http error! ${out.status}`);
    }

    const data = await out.json();
    res
      .status(200)
      .json({ success: true, location: location, response: data.response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching msitral", error });
  }
};

export const postComment = async (req, res) => {
  // จาก middleware
  const username = req.username;
  const userId = req.userId;
  try {
    // request the id of the post and store the comment in that post
    const pid = req.params.postID;
    const comment = req.body;
    // find that post by id from the URL
    const post = await Post.findById(pid);
    if (!post) {
      res.status(404).json({ success: false, message: "post not found" });
    }

    const newComment = {
      user: username,
      userId: userId,
      content: comment.content,
    };

    post.comment.push(newComment);

    await post.save();

    return res
      .status(201)
      .json({ success: true, message: "comment added", comment: newComment });
  } catch (error) {
    console.error("error adding comment", error);
    res.status(500).json({
      succes: false,
      message: "Cant add error bitch adn its a server error",
    });
  }
};

export const getComment = async (req, res) => {
  const postId = req.params.pid;

  try {
    const post = await Post.findById(postId).select("comment");
    if (!post) {
      res.status(404).json({ sucess: false, message: "post not found" });
    }
    res.status(200).json({ success: true, data: { comments: post.comment } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/user/cheng/profile",
      {
        method: "GET",
      }
    );
    console.log(response);
    if (!response.success) {
      res.status(500).json({ sucess: false, message: "server Error" });
      return;
    }
    const data = await response.json();
    res.status(200).json({ sucess: true, data: { data } });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProfile = async (req, res) => {
  const username = req.username;
  const userId = req.userId;
  const avatar = req.userAvatar || undefined;

  try {
    const existingUser = await User.findOne({ uid: userId });
    if (existingUser) {
      res.status(200).json({
        success: true,
        message: "User already exists",
        profile: existingUser,
      });
      return;
    }

    const newUser = new User({
      uid: userId,
      username: username,
      avatar: avatar,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User saved",
      profile: { username, userId, avatar },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const postLike = async (req, res) => {
  const pid = req.params.pid;
  const uid = req.userId;

  try {
    const user = await User.findOne({ uid: uid });
    const post = await Post.findById(pid);
    console.log(user);

    if (post.likeby.includes(uid)) {
      post.likeby = post.likeby.filter((like) => like !== uid);
      user.like = user.likes.filter((like) => like !== pid);

      await post.save();
      await user.save();

      res.status(200).json({ success: "updated", likes: post.likeby.length });
      return;
    }

    user.likes.push(pid);
    post.likeby.push(uid);

    const numLikes = post.likeby.length;

    await user.save();
    await post.save();

    res
      .status(200)
      .json({ success: true, post: post, user: user, numLikes: numLikes });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error liking post" });
  }
};

export const getLike = async (req, res) => {
  const pid = req.params.pid;

  try {
    const post = await Post.findById(pid);

    const count = post.likeby.length;

    res.status(200).json({ success: true, data: count });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error getting like" });
  }
};

export const getTopPost = async (req, res) => {
  console.log("Check top posts");

  try {
    const topPost = await Post.aggregate([
      {
        $project: {
          name: 1,
          content: 1,
          country: 1,
          image: 1,
          likebyLength: { $size: "$likeby" }, // get likeby size
        },
      },
      {
        $sort: { likebyLength: -1 }, // Sort by the size of 'likeby' array in descending order
      },
      {
        $limit: 3,
      },
    ]);

    res.status(200).json({ success: true, data: topPost });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error getting top posts" });
  }
};

export const getByCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const post = await Post.findOne({ country: country });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error getting posts" });
  }
};
