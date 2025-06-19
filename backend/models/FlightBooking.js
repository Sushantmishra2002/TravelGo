const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
});

const contactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  countryCode: String,
});

const paymentDetailsSchema = new mongoose.Schema({
  cardNumber: String,
  expiry: String,
  cvv: String,
  upiId: String,
  bank: String,
  provider: String,
  walletPhone: String,
});

const bookingSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: [passengerSchema],
  contact: contactSchema,
  paymentMethod: { type: String, enum: ['credit-card', 'upi', 'net-banking', 'wallet', 'cod'], required: true },
  paymentDetails: paymentDetailsSchema,
  totalCost: Number,
  confirmationNumber: String,
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FlightBooking', bookingSchema);
