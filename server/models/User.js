const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },

  // User profile
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'N/A'],
    default: 'N/A'
  },
  language: {
    type: String,
    default: 'English'
  },
  dob: {
    type: String
  },
  tel: {
    type: String,
    trim: true
  },

  // Social media
  twitter: {
    type: String,
    trim: true
  },
  facebook: {
    type: String,
    trim: true
  },
  instagram: {
    type: String,
    trim: true
  },

  // Pic
  avatar: {
    type: String // เก็บ path ของไฟล์
  },
  cover: {
    type: String // เก็บ path ของไฟล์
  },

  country: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },

  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // for createdAt and updatedAt automatically
});

// อัพเดท updatedAt เมื่อมีการแก้ไขข้อมูล
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", userSchema);