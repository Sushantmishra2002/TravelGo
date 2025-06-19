const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classType: { type: String, required: true }, // e.g., Sleeper, AC
  seatsAvailable: { type: Number, required: true },
  fare: { type: Number, required: true }
});

const trainSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  trainName: { type: String, required: true },
  freeCancellation: { type: Boolean, default: false },
  classes: [classSchema] // 👈 Add classes as an array of objects
});

module.exports = mongoose.model("Trains", trainSchema);
