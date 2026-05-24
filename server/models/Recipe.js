const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Sarapan', 'Makan Siang', 'Makan Malam', 'Cemilan']
  },
  ingredients: [{
    name: { type: String, required: true },
    amount: { type: String, required: true }
  }],
  steps: [{
    step: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' }
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cookTime: {
    type: String,
    default: ''
  },
  servings: {
    type: Number,
    default: 1
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
