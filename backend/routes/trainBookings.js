const express = require('express');
const router = express.Router();
const Booking = require('../models/TrainBooking');

// Utility to generate a confirmation number
const generateConfirmationNumber = () => {
  return 'TRN' + Math.floor(100000 + Math.random() * 900000);
};

// CREATE
router.post('/', async (req, res) => {
  try {
    const { trainId, passengers, contact, paymentMethod, paymentDetails, totalCost } = req.body;
    const confirmationNumber = generateConfirmationNumber();

    const newBooking = new Booking({
      trainId,
      passengers,
      contact,
      paymentMethod,
      paymentDetails,
      totalCost,
      confirmationNumber
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', confirmationNumber });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// READ all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// UPDATE a booking
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// DELETE a booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
});

module.exports = router;
