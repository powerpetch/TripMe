const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

// สำหรับอัปโหลดไฟล์รูป
const multer = require("multer");
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// ดึงข้อมูล user จาก userId ใน token
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password') // ไม่ดึง password (ดึงมันอันตราย)
      .lean(); // แปลงเป็น plain object
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // แปลง path เป็น URL สำหรับรูปภาพ
    if (user.avatar) {
      user.avatar = `/uploads/${path.basename(user.avatar)}`;
    }
    if (user.cover) {
      user.cover = `/uploads/${path.basename(user.cover)}`;
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error" 
    });
  }
});

// แก้ไขข้อมูล user
router.put("/update", 
  authMiddleware, 
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]), 
  async (req, res) => {
    try {
      console.log("DEBUG: req.body =>", req.body);
      console.log("DEBUG: country =>", req.body.country);
      console.log("DEBUG: city =>", req.body.city);

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // อัพเดทข้อมูลพื้นฐาน
      const updateFields = [
        "username", "firstName", "lastName", "gender", "tel", 
        "language", "dob", "country", "city", "twitter", "facebook", "instagram"
      ];

      updateFields.forEach(field => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });

      // // อัพเดท password
      // if (req.body.password) {
      //   const hashedPass = await bcrypt.hash(req.body.password, 10);
      //   user.password = hashedPass;
      // }

      // จัดการไฟล์เก่าและอัพเดทพาธใหม่
      if (req.files?.avatar) {
        if (user.avatar) {
          try {
            await fs.unlink(path.join(process.cwd(), user.avatar));
          } catch (err) {
            console.error('Error deleting old avatar:', err);
          }
        }
        user.avatar = req.files.avatar[0].path;
      }

      if (req.files?.cover) {
        if (user.cover) {
          try {
            await fs.unlink(path.join(process.cwd(), user.cover));
          } catch (err) {
            console.error('Error deleting old cover:', err);
          }
        }
        user.cover = req.files.cover[0].path;
      }

      await user.save();

      // ส่งข้อมูลกลับโดยไม่มี password
      const userResponse = user.toObject();
      delete userResponse.password;

      // แปลง path เป็น URL สำหรับรูปภาพ
      if (userResponse.avatar) {
        userResponse.avatar = `/uploads/${path.basename(userResponse.avatar)}`;
      }
      if (userResponse.cover) {
        userResponse.cover = `/uploads/${path.basename(userResponse.cover)}`;
      }

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

    // 1. Find the user from userId (at authMiddleware)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 2. Compare oldPassword with the hashed password in DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    // 3. Hash the newPassword and save
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