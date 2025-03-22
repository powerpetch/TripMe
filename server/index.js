require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose'); // Add mongoose import

// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const tripDetailRoutes = require("./routes/tripDetail.js");

const postsRouter = require("./routes/posts");
const { connectdb } = require('./config/db');

const app = express();

// middleware
app.use(express.json()); // to use req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trips", tripDetailRoutes);

app.use(postsRouter);

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));


// test route
app.get("/", (req, res) => {
  res.send("server is ready");
});

// Start server function
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

  // Error handlers
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
  });
}

// Connect to MongoDB then start server
const DB_URI = process.env.MONGO_URI;
if (!DB_URI) {
  console.error("MongoDB URI is missing!");
  process.exit(1);
} else {
  mongoose.connect(DB_URI)
    .then(() => {
      console.log("MongoDB connected");
      connectdb(); // Call connectdb after mongoose connects
      startServer(); // Start server after DB connection
    })
    .catch(err => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Server Error' 
  });
});