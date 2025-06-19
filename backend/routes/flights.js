const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// CREATE
router.post('/', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ SINGLE
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Bulk insert flights
router.post('/bulk', async (req, res) => {
    try {
      const flights = await Flight.insertMany(req.body);
      res.status(201).json(flights);
    } catch (error) {
      res.status(400).json({ message: 'Bulk insert failed', error });
    }
  });
  // GET /api/flights?limit=4&sort=cost
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const sortField = req.query.sort || 'departureDate';
  
    try {
      const flights = await Flight.find().sort({ [sortField]: 1 }).limit(limit);
      res.json(flights);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
