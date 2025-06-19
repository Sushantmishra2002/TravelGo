// backend/routes/bookings.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Your Booking model
const Booking = require("../models/HotelBooking");

// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

module.exports = router;
