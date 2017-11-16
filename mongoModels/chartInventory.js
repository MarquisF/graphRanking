const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  picId: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;