const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// GET (search)
router.get("/", async (req, res) => {
  try {
    const { from, to, date, freeCancellation, class: trainClass } = req.query;

    const filter = {
      ...(from && { from }),
      ...(to && { to }),
      ...(date && { date }),
      ...(freeCancellation !== undefined && { freeCancellation: freeCancellation === "true" }),
    };

    let trains = await Train.find(filter);

    if (trainClass) {
      // Filter classes inside each train object
      trains = trains.map((train) => {
        const matchedClass = train.classes.find((c) => c.classType === trainClass);
        return matchedClass
          ? {
              ...train.toObject(),
              classes: [matchedClass]
            }
          : null;
      }).filter(Boolean);
    }

    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST single
router.post('/', async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST bulk
router.post('/bulk', async (req, res) => {
  try {
    const trains = await Train.insertMany(req.body);
    res.status(201).json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const updatedTrain = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Train.findByIdAndDelete(req.params.id);
    res.json({ message: "Train deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
