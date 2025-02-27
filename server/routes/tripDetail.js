const express = require("express");
const { createTrips, deleteTrips, getTrips, updateTrips } = require("../controllers/trips.js");
const router = express.Router();


router.post("/", createTrips);           // create trip
router.delete("/:id", deleteTrips );    // TODO: only creator can delete
router.get("/", getTrips);              // get all trips
router.put("/:id", updateTrips);        // TODO: only creator can edit

module.exports = router;
