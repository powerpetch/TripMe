require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

const path = require('path');

// middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


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

  // unhandled rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
  });

  // uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
  });
}

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    startServer();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// global errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Server Error' 
  });
});