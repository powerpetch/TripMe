const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Token generation with 1 hour expiration, i set default to 1 hour can change if needed
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please fill all fields" 
      });
    }

    // Check existing user
    const exist = await User.findOne({ $or: [{ username }, { email }] });
    if (exist) {
      return res.status(400).json({ 
        success: false,
        message: "Username or Email already exists" 
      });
    }

    // Create new user
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPass
    });

    // Generate token
    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "Sign up success",
      token,
      expiresIn: 3600,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error" 
    });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please fill all fields" 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Sign in success",
      token,
      expiresIn: 3600, // 1 hour in seconds, can add more what do u guys think?
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Signin Error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error" 
    });
  }
});

// Verify token route
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      user
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        expired: true
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
});

module.exports = router;