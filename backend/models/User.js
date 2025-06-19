const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  name: String,
  number: String,
  source: String,
  destination: String,
  travelDate: Date,
  classes: {
    General: Number,
    "3AC": Number,
    "2AC": Number,
    "1AC": Number,
  },
  prices: {
    General: Number,
    "3AC": Number,
    "2AC": Number,
    "1AC": Number,
  },
});

module.exports = mongoose.model("Train", TrainSchema);
