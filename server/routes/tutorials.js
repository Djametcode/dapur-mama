const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');

// GET /api/tutorials - list with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    const tutorials = await Tutorial.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ tutorials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tutorials/:id - single tutorial
router.get('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id)
      .populate('author', 'name avatar');

    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }

    res.json({ tutorial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
