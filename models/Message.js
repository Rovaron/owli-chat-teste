const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
  from: {
    type: mongoose.ObjectId,
    required: true
  },
  to: {
    type: mongoose.ObjectId,
    required: true
  },
  message: {
    type: String,
    default: ''
  }
}, {timestamps: true})

module.exports = messageSchema