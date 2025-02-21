const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number
});

const DaySchema = new mongoose.Schema({
  dayNumber: Number,
  places: [PlaceSchema]
});

const TripSchema = new mongoose.Schema({
  title: String,
  description: String,
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  cost: String,
  includePlaneTicket: Boolean,
  images: [String],
  days: [DaySchema],

});

module.exports = mongoose.model('Trip', TripSchema);
