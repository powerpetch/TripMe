const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const TripDetail = require("../models/TripDetail.js");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const validateTrip = require("../middleware/tripvalidation.js"); // Import your validation middleware
const { validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User.js");

const router = express.Router();

// Multer configuration for handling file uploads
// const storage = multer.memoryStorage(); // Stores files in memory before upload
router.get("/random", async (req, res) => {
  console.log("Random trips route hit");
  try {
    const trips = await TripDetail.aggregate([{ $sample: { size: 7 } }]); // Fetch 7 random trips
    console.log("Fetched trips:", trips);

    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

// create
router.post(
  "/",
  authMiddleware,
  upload.array("photos"),
  (req, res, next) => {
    try {
      req.body.travelPeriod = JSON.parse(req.body.travelPeriod);
      req.body.visitedPlaces = JSON.parse(req.body.visitedPlaces);
      req.body.accommodations = JSON.parse(req.body.accommodations);
      req.body.transportations = JSON.parse(req.body.transportations);
      req.body.budgetItems = JSON.parse(req.body.budgetItems);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in request body" });
    }
    next(); // Pass the request to the validation middleware
  },

  validateTrip,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array()); // Log errors to console
      return res.status(400).json({ errors: errors.array() }); // Send error response
    }

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
    console.log(req.body);
    console.log(req.files);

    try {
      // Upload images to Cloudinary and store URLs
      const photoURLs = [];
      for (let i = 0; i < photos.length; i++) {
        const result = await cloudinary.uploader.upload(photos[i].path, {
          folder: "trip_images",
        });
        photoURLs.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
        //delte from uploads
        fs.unlinkSync(photos[i].path);
        // console.log(photoURLs)
      }
      const userId = req.userId;

      // MongoDB
      const newTrip = new TripDetail({
        userId,
        country,
        travelPeriod,
        visitedPlaces,
        accommodations,
        transportations,
        weatherNotes,
        clothingTips,
        budgetItems,
        photos: photoURLs,
      });

      const savedTrip = await newTrip.save();
      await User.findByIdAndUpdate(userId, { $push: { trips: savedTrip._id } });
      res.status(201).json({
        message: "Trip created successfully",
        trip: savedTrip,
        redirectUrl: `/trip/${savedTrip._id}`,
      });
      console.log(newTrip);
    } catch (err) {
      console.error("Error Creating Trip:", err);
      res
        .status(500)
        .json({ message: "Error creating trip", error: err.message });
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const trips = await TripDetail.find().populate("userId", "username").sort({ createdAt: -1 });; 
    res.status(200).json(trips); 
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ message: "Error fetching trips", error: err });
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params; // Get the trip ID from the request URL
//     const updatedData = req.body; // Get the updated trip details

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({succes: false, message: "Invalid trip id"})
//     }
//     const updatedTrip = await TripDetail.findByIdAndUpdate(id, updatedData, { new: true });
//     res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
//   } catch (err) {
//     console.error('Error updating trip:', err);
//     res.status(500).json({ message: 'Error updating trip', error: err });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await TripDetail.findById(id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    for (let photo of trip.photos) {
      try {
        // Delete from Cloudinary using the public_id
        await cloudinary.uploader.destroy(photo.public_id);
        console.log(`Deleted image from Cloudinary: ${photo.public_id}`);
      } catch (err) {
        console.error(
          `Error deleting image ${photo.public_id} from Cloudinary:`,
          err
        );
      }
    }
    const deletedTrip = await TripDetail.findByIdAndDelete(id);
    await User.updateMany(
      { trips: id }, // Find users who have this trip
      { $pull: { trips: id } } // Remove the trip ID from the trips array
    );
    res.json({ message: "Trip deleted successfully", trip: deletedTrip });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!tripId || tripId === "undefined") {
      return res.status(400).json({ message: "Invalid trip ID" });
    }
    const trip = await TripDetail.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/trips", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; //from token
    console.log("fetch trips for user:", userId);

    const trips = await TripDetail.find({ userId });

    if (!trips.length) {
      return res.status(404).json({ message: "no trips found for this user." });
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.put(
  "/:tripId",
  upload.array("photos"),
  (req, res, next) => {
    // console.log("Received req.body:-------------------------", req.body);
    // console.log("Received req.files:", req.files);

    try {
      req.body.travelPeriod = JSON.parse(req.body.travelPeriod);
      req.body.visitedPlaces = JSON.parse(req.body.visitedPlaces);
      req.body.accommodations = JSON.parse(req.body.accommodations);
      req.body.transportations = JSON.parse(req.body.transportations);
      req.body.budgetItems = JSON.parse(req.body.budgetItems);
      req.body.deletedPhotos = JSON.parse(req.body.deletedPhotos);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in request body" });
    }
    next(); // Pass the request to the validation middleware
  },

  validateTrip,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array()); // Log errors to console
      return res.status(400).json({ errors: errors.array() }); // Send error response
    }

    const {
      country,
      travelPeriod,
      visitedPlaces,
      accommodations,
      transportations,
      weatherNotes,
      clothingTips,
      budgetItems,
      deletedPhotos,
    } = req.body;

    const photos = req.files;
    const { tripId } = req.params;


    try {
      const existingTrip = await TripDetail.findById(tripId);
      if (!existingTrip)
        return res.status(404).json({ message: "Trip not found" });

      const deletedPhotosIds = deletedPhotos.map((photo) => photo.id)


      const photosToKeep = existingTrip.photos
        .filter((photo) => !deletedPhotosIds.includes(photo._id.toString()))
        .map((photo) => {
          return { url: photo.url, public_id: photo.public_id };
        });

      for (const photo of deletedPhotos) {
        await cloudinary.uploader.destroy(photo.public_id);
      }

      const photoURLs = [];
      for (let i = 0; i < photos.length; i++) {
        const result = await cloudinary.uploader.upload(photos[i].path, {
          folder: "trip_images",
        });
        photoURLs.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
        //delte from uploads
        fs.unlinkSync(photos[i].path);
        // console.log(photoURLs)
      }

      // Merge kept photos with newly uploaded ones
      const finalPhotos = [...photosToKeep, ...photoURLs];

      const updatedTrip = await TripDetail.findByIdAndUpdate(
        tripId,
        {
          country,
          travelPeriod,
          visitedPlaces,
          accommodations,
          transportations,
          weatherNotes,
          clothingTips,
          budgetItems,
          photos: finalPhotos,
        },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        message: "Trip updated successfully",
        trip: updatedTrip,
        redirectUrl: `/trip/${updatedTrip._id}`,
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
