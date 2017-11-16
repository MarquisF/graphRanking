const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
  chartId1: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: 'Inventory'
  },
  chartId2: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: 'Inventory'
  },
  round: {
    type: Number,
    required: true
  },
  // user store ObjectId
  user: {
    type: String,
    // required: true,
    default: '',
    ref: 'User'
  },
  // 0 for chart_1, 1 for chart_2
  result: {
    type: Number,
    required: true,
    default: 0
  },
  // 0 for notFinished, 1 for accessing, 2 for finished
  status: {
    type: Number,
    required: true,
    default: 0
  },
  expireTime: {
    type: Number,
    default: 0
  },
  reason: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Score', scoreSchema);