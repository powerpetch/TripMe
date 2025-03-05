const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// ตั้งค่า CloudinaryStorage สำหรับ multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images', // ชื่อ folder ที่จะเก็บใน Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});

// ตั้งค่า multer โดยใช้ Cloudinary storage
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // จำกัดขนาดไฟล์ 5MB
});

// GET profile route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password') // ไม่ส่ง password กลับ
      .lean(); // แปลงเป็น plain JS object
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // เมื่อใช้ Cloudinary ไฟล์ที่เก็บจะเป็น URL อยู่แล้ว
    return res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error" 
    });
  }
});

// UPDATE user profile route (ใช้ Cloudinary สำหรับอัปโหลด avatar และ cover)
router.put("/update", 
  authMiddleware, 
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]), 
  async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // อัปเดตฟิลด์ทั่วไปจาก req.body
      const updateFields = [
        "username", "firstName", "lastName", "gender", "tel", 
        "language", "dob", "country", "city", "twitter", "facebook", "instagram"
      ];
      updateFields.forEach(field => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });

      // อัปเดตรูปจาก Cloudinary (URL จะได้จาก req.files)
      if (req.files?.avatar) {
        user.avatar = req.files.avatar[0].path; // path เป็น URL ที่ Cloudinary ส่งกลับมา
      }
      if (req.files?.cover) {
        user.cover = req.files.cover[0].path;
      }

      await user.save();

      // prepare response โดยลบ password
      const userResponse = user.toObject();
      delete userResponse.password;

      return res.json({ 
        success: true, 
        user: userResponse
      });
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ 
        success: false,
        message: "Server Error",
        error: err.message 
      });
    }
  }
);

router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide oldPassword and newPassword"
      });
    }

    // หา user จาก userId (จาก authMiddleware)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // เปรียบเทียบรหัสผ่านเก่ากับรหัสผ่านที่เข้ารหัสใน DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    // เข้ารหัสรหัสผ่านใหม่และบันทึก
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;
