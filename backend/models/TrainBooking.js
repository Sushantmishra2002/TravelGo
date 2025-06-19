const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,
});

const BookingSchema = new mongoose.Schema({
  trainId: String,
  passengers: [PassengerSchema],
  contact: {
    email: String,
    phone: String,
    countryCode: String
  },
  paymentMethod: String,
  paymentDetails: mongoose.Schema.Types.Mixed,
  totalCost: Number,
  confirmationNumber: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrainBooking', BookingSchema);
