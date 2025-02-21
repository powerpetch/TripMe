require("dotenv").config(); // อ่านตัวแปรจาก .env

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// นำเข้า routes
const authRoutes = require("./routes/auth");
const tripsRoutes = require("./routes/trips");
const userRoutes = require("./routes/user");

const app = express();

// มิดเดิลแวร์พื้นฐาน
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // สำหรับเซิร์ฟรูปภาพ

// ลงทะเบียน routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/user", userRoutes);

// ฟังก์ชั่นเริ่ม server
function startServer() {
  const PORT = process.env.PORT || 5000;
  
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
      server.listen(PORT + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  // จัดการ unhandled rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
  });

  // จัดการ uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
  });
}

// เชื่อมต่อ MongoDB แล้วเริ่ม server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    startServer();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// จัดการ global errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' 
  });
});