const Booking = require('../models/FlightBooking');
const crypto = require('crypto');

exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengers, contact, paymentMethod, paymentDetails, totalCost } = req.body;

    const confirmationNumber = 'FLY-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const newBooking = new Booking({
      flightId,
      passengers,
      contact,
      paymentMethod,
      paymentDetails,
      totalCost,
      confirmationNumber,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful', confirmationNumber });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error while booking flight' });
  }
};
