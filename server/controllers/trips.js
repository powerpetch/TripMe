const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upLoad = multer();
const { TripDetail } = require('../models/TripDetail.js');

const getTrips = async (req,res) => {
    try {
        const trips = await TripDetail.find({});
        res.status (200).json ({ success: true, data: trips });
        
    } catch (error) {
        console.error("error in fetching trips", error.message); 
        res.status(500).json({success: false, message: "server error "})    
    }
};

const createTrips = async (req, res) => {
    const { country, travelPeriod, visitedPlaces, accommodations, transportations, weatherNotes, clothingTips, budgetItems, photos } = req.body;
  
    try {
      // Upload photos to Cloudinary and collect URLs
      const uploadedPhotos = [];
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.filePath, { folder: 'trip_photos' });
        uploadedPhotos.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
  
      const newTrip = new TripDetail({
        country,
        travelPeriod,
        visitedPlaces,
        accommodations,
        transportations,
        weatherNotes,
        clothingTips,
        budgetItems,
        photos: uploadedPhotos
      });
  
      await newTrip.save();
      console.log('Trip created successfully');
      res.status(201).json(newTrip);
    } catch (error) {
      console.error('Error creating trip:', error);
      res.status(500).json({ message: 'Error creating trip', error });
    }
};

const deleteTrips = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid trip id"})    
    }
    try {
        //finds a document by id in the Trip collection and delete
        await TripDetail.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Trip deleted"})        
    } catch (error) {
        console.error("error in deleting trip", error.message);
        res.status(500).json({success: false, message: "server error "})     
    }  
};

const updateTrips = async (req,res) => {
    const {id} = req.params 
    const trip = req.body 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({succes: false, message: "Invalid trip id"})
    }
    try {
        const updatedTrip = await TripDetail.findByIdAndUpdate(id, trip,{new:true})
        res.status(200).json({success: true, data: updatedTrip})
    
    } catch (error) {
        res.status(500).json({success: false, message: "server error "})
        
    }
};

module.exports = { createTrips, deleteTrips, getTrips, updateTrips }