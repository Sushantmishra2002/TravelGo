const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// CREATE - Add a new hotel
router.post("/", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Get hotels by country/city
router.get("/", async (req, res) => {
  const { country, city } = req.query;
  const query = {};

  if (country) query.country = new RegExp(country, "i");
  if (city) query.city = new RegExp(city, "i");

  try {
    const hotels = await Hotel.find(query);
    res.json({ hotels });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Get single hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Update a hotel by ID
router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete a hotel by ID
router.delete("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// BULK INSERT - Add multiple hotels at once
router.post("/bulk", async (req, res) => {
  try {
    const hotels = await Hotel.insertMany(req.body.hotels);
    res.status(201).json({ message: "Hotels added successfully", hotels });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
