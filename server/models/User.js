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

  // Email verification fields
  verifiedEmail: {
    type: Boolean,
    default: false
  },
  verifyEmailOTP: {
    type: String
  },
  verifyEmailOTPExpires: {
    type: Date
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

  // Profile pictures
  avatar: {
    type: String
  },
  cover: {
    type: String
  },

  // Location
  country: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },

  // Reset password
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "TripDetail" }],

}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Update timestamp when saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", userSchema);