// server/routes/user.js
const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
