const express = require('express');
const TripDetail = require('../models/TripDetail.js');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const router = express.Router();

// create
router.post('/create', upload.array('photos'), async (req, res) => {
  const {
    country,
    travelPeriod,
    visitedPlaces,
    accommodations,
    transportations,
    weatherNotes,
    clothingTips,
    budgetItems,
  } = req.body;

  const photos = req.files;
//   console.log(req.body)
//   console.log(req.files)

  try {
    // Upload images to Cloudinary and store URLs
    const photoURLs = [];
    for (let i = 0; i < photos.length; i++) {
      const result = await cloudinary.uploader.upload(photos[i].path, {
        folder: 'trip_images', 
      });
      photoURLs.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
      console.log(photoURLs)
    
    }

    // MongoDB
    const newTrip = new TripDetail({
      country,
      travelPeriod: JSON.parse(travelPeriod),
      visitedPlaces: JSON.parse(visitedPlaces),
      accommodations: JSON.parse(accommodations),
      transportations: JSON.parse(transportations),
      weatherNotes,
      clothingTips,
      budgetItems: JSON.parse(budgetItems),
      photos: photoURLs,
    });

    await newTrip.save();
    res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
    console.log(newTrip)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating trip', error: err });
  }
});

module.exports = router;