const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  country: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  numberOfPersons: { type: Number, required: true },
  mealType: { type: String, required: true },
  startDate: { type: Date, required: true },
  facilities: { type: [String], default: [] },
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
