const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  departureDate: Date,
  returnDate: Date,
  passengers: Number,
  travelClass: String,
  specialFare: String,
  cost: Number
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
