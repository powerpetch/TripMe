const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");      // for random token
const nodemailer = require("nodemailer"); // for sending email

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

// -------------------- SIGNUP --------------------
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

// -------------------- SIGNIN --------------------
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


// -------------------- VERIFY TOKEN  --------------------
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

// -------------------- FORGOT PASSWORD --------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    // หา user จาก email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "No user with that email" 
      });
    }

    // create token with 20 random bytes
    const token = crypto.randomBytes(20).toString("hex");

    // set token expires 15 minutes
    const expires = Date.now() + 15 * 60 * 1000;

    // save token and expires to user
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    // create reset link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      to: user.email,
      from: "no-reply@yourapp.com",
      subject: "Password Reset",
      text: `
        You requested a password reset.
        Please click this link to reset your password (valid 15 minutes):
        ${resetLink}
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Reset link sent to your email"
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error" 
    });
  }
});

// -------------------- RESET PASSWORD --------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and newPassword are required"
      });
    }

    // find user with token and not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // update password
    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.password = hashedPass;

    // clear token and expires
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully"
    });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;