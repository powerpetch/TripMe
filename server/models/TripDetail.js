const mongoose = require("mongoose");
const { Schema } = mongoose;

// activity schema 
const activitySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
  });

// budget schema with subcategories
const budgetSchema = new Schema({
    food: { type: Number, default: 0},
    transport: { type: Number, default: 0 },
    accommodation: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
});

// travel data schema
const travelSchema = new Schema({
    country: { type: String, required: true },
    placesVisited: [{ type: String, required: true }],
    travelPeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    accommodationNames: [{ type: String }],
    accomBookingPlatforms: [{ type: String }],
    transportationModes: [{ type: String }],
    transBookingPlatforms: [{ type: String }],
    activities: [activitySchema], // array of activities
    weatherNotes: { type: String },
    clothesTips: { type: String },
    budget: budgetSchema,
    gallery: [{ type: String }], // URLs of photos hosted in cloud
  },
    {
        timestamps: true
    }
);

const TripDetail = mongoose.model('TripDetail', travelSchema)
module.exports = {TripDetail};

  

