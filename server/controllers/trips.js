const mongoose = require("mongoose");
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

const createTrips = async (req,res) => {
    // get data from the request body
    const trip = req.body;
    
    // Check if the required fields are provided // later implement dropdown in frontend
    if (!trip.country || typeof trip.country !== 'string' || trip.country.trim() === '') {
        return res.status(400).json({
        success: false,
        message: 'country is required and must be not be -empty'
        });
    }
    // 
    if (!Array.isArray(trip.placesVisited) || trip.placesVisited.length === 0) {
        return res.status(400).json({
        success: false,
        message: 'places visited should not be empty'
        });
    }
    // calender in frontemnd
    if (!trip.travelPeriod || !trip.travelPeriod.start || !trip.travelPeriod.end) {
        return res.status(400).json({
        success: false,
        message: 'start and end dates is required'
        });
    }
    
    const startDate = new Date(trip.travelPeriod.start);
    const endDate = new Date(trip.travelPeriod.end);
    
    // check if dates are numbers
    if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({
        success: false,
        message: 'invalid date format'
        });
    }
    // check if start date less than end date
    if (startDate >= endDate) {
        return res.status(400).json({
        success: false,
        message: 'start date must be before end date'
        });
    }
    
    //validation lib--zod
    
    // validation (ensure it's an array and not empty)
    if (!Array.isArray(trip.accommodationNames) || trip.accommodationNames.length === 0) {
        return res.status(400).json({
        success: false,
        message: 'AccommodationNames is required and should not be empty array'
        });
    }
    if (!Array.isArray(trip.accomBookingPlatforms) || trip.accomBookingPlatforms.length === 0) {
        return res.status(400).json({
        success: false,
        message: 'AccomBookingPlatforms is required and should not be empty array'
        });
    }
    
    // validation (ensure it's an array and not empty)
    if (!Array.isArray(trip.transportationModes) || trip.transportationModes.length === 0) {
        return res.status(400).json({
        success: false,
        message: 'TransportationModes is required and should not be empty array'
        });
    }
    
    if (!Array.isArray(trip.transBookingPlatforms) || trip.transBookingPlatforms.length === 0) {
        return res.status(400).json({
        success: false,
        message: 'TransBookingPlatforms is required and should not be empty array'
        });
    }
    
    //creates a new instance of the Trip model using the data stored in the trip object. 
    const newTrip = new TripDetail(trip)
    
    try {
        await newTrip.save();
        console.log("Trip created:", newTrip);
        res.status(201).json({success: true, data:newTrip});
    } catch (error) {
        console.error("error in creating trip", error.message);
        res.status(500).json({success: false, message: "server error; could be wrong data type entering"})
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