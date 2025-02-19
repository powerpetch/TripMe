require("dotenv").config(); // อ่านตัวแปรจาก .env

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const tripsRoutes = require("./routes/trips");


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB Error:", err));

// จะผูก route auth ทีหลัง
app.use("/api/auth", authRoutes);

// ผูก router
app.use("/api/trips", tripsRoutes);

// เริ่ม
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
