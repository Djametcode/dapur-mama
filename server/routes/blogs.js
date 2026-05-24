const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET /api/blogs - list with optional search/tag filters
router.get('/', async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/blogs/:id - single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name avatar');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
