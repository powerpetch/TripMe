require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require('path');

// routes
const authRoutes = require("./routes/auth");
// const tripsRoutes = require("./routes/trips");
const userRoutes = require("./routes/user");
const tripDetailRoutes = require("./routes/tripDetail.js")   // importing tripdetailroutes
const { connectdb } = require('./config/db');
const app = express();

// middleware
app.use(express.json()); // to use req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// using tripdetailRoutes
app.use("/api", tripDetailRoutes)


// use routes
app.use("/api/auth", authRoutes);
// app.use("/api/trips", tripsRoutes);
app.use("/api/user", userRoutes);

// my test to check server running
app.get("/",(req,res) => {
  res.send("server is rcceady")
});


//TODO: need a static port o
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

  // unhandled rejections                     // oonema na
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

//starting server
startServer();
connectdb();

// connect to MongoDB
// const DB_URI = process.env.MONGO_URI;
// if (!DB_URI) {
//   console.error("MongoDB URI is missing!");
  
// }else{
// mongoose.connect(DB_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     startServer();
//   })
//   .catch(err => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
// })};

// // global errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' 
  });
});