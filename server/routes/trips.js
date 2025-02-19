const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.post('/', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ _id: -1 });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrip) return res.status(404).json({ error: 'Trip not found' });
    res.json(updatedTrip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update trip' });
  }
});

// DELETE: ลบทริป
router.delete('/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

module.exports = router;
