const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  amenities: {
    type: [String], // e.g., ["WiFi", "Pool", "Gym"]
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model("Hotel", hotelSchema);
