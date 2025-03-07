const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
  },
  country: {
    type: String,
  },
  travelPeriod: {
    type: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
  },
  visitedPlaces: [
    {
      name: { type: String },
      description: { type: String },
    },
  ],
  accommodations: [
    {
      name: { type: String },
      type: { type: String },
      bookingPlatform: { type: String },
      cost: { type: Number },
    },
  ],
  transportations: [
    {
      type: { type: String },
      from: { type: String },
      to: { type: String },
      bookingPlatform: { type: String },
      cost: { type: Number },
    },
  ],
  weatherNotes: {
    type: String,
  },
  clothingTips: {
    type: String,
  },
  budgetItems: [
    {
      category: { type: String },
      description: { type: String },
      amount: { type: Number },
    },
  ],
  photos: [
    {
      url: { type: String },
      public_id: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TripDetail', tripSchema);
