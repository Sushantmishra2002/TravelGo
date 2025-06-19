const express = require('express');
const router = express.Router();
const TourPackage = require('../models/TourPackage');

// @route   GET /api/tours
// @desc    Get all tours or filtered tours
router.get('/', async (req, res) => {
  const { country, budget, numberOfPersons, month } = req.query;
  let query = {};

  if (country) query.country = { $regex: new RegExp(country, 'i') };
  if (budget) query.budget = { $lte: Number(budget) };
  if (numberOfPersons) query.numberOfPersons = { $gte: Number(numberOfPersons) };
  if (month) {
    const [year, mon] = month.split('-');
    const start = new Date(`${year}-${mon}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    query.startDate = { $gte: start, $lt: end };
  }

  try {
    const tours = await TourPackage.find(query);
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// @route   GET /api/tours/:id
// @desc    Get a single tour by ID
router.get('/:id', async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// @route   POST /api/tours
// @desc    Create a new tour
router.post('/', async (req, res) => {
  try {
    const newTour = new TourPackage(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create tour', error });
  }
});

// @route   PUT /api/tours/:id
// @desc    Update a tour
router.put('/:id', async (req, res) => {
  try {
    const updatedTour = await TourPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update tour', error });
  }
});

// @route   DELETE /api/tours/:id
// @desc    Delete a tour
router.delete('/:id', async (req, res) => {
  try {
    const deletedTour = await TourPackage.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete tour', error });
  }
});
router.post('/bulk', async (req, res) => {
  try {
    const tours = await TourPackage.insertMany(req.body);
    res.status(201).json({ message: 'Bulk insert successful', tours });
  } catch (error) {
    res.status(400).json({ message: 'Bulk insert failed', error });
  }
});
router.get('/countries', async (req, res) => {
  const { search } = req.query;
  try {
    const results = await TourPackage.find({ country: new RegExp(search, 'i') }).limit(10);
    const countries = [...new Set(results.map(r => r.country))]; // Unique countries
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching country suggestions' });
  }
});
module.exports = router;
