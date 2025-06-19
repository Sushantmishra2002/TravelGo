require("dotenv").config(); // 👈 Load .env first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const hotelRoutes = require("./routes/hotelApi");
const bookingRoutes = require("./routes/hotelbookings");
const authRoutes = require("./routes/authRoutes"); // 👈 Import your auth routes
const flightRoutes = require('./routes/flights');

const flightBookings = require('./routes/bookingsFlight'); // ✅ Flight booking route
const trainRoutes = require("./routes/trainRoutes"); // ✅ Train routes
const trainBookings = require("./routes/trainBookings"); // ✅ Train booking route
const tourRoutes = require("./routes/tourRoutes"); // ✅ Tour package routes




const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/hotels", hotelRoutes); // Hotel routes
app.use("/api/Hotelbookings", bookingRoutes); // Hotel booking routes
app.use("/api/auth", authRoutes); // 👈 Authentication routes (signup, login)
app.use("/api/flights", flightRoutes);           // Flight APIs
app.use("/api/flight-bookings", flightBookings); // ✅ Flight booking APIs
app.use("/api/trains", trainRoutes); // ✅ Train APIs
app.use("/api/train-bookings", trainBookings); // ✅ Train booking APIs
app.use("/api/tour-packages", tourRoutes);// ✅ Tour package APIs



// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});










