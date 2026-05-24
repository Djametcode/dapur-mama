const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - list all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
