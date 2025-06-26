const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  username: { type: String, unique: true, required: true },
  role: { type: String, enum: ['engineer', 'manager'] },
  skills: [String],
  seniority: { type: String, enum: ['junior', 'mid', 'senior'] },
  maxCapacity: Number,
  department: String,
});

module.exports = mongoose.model('User', userSchema);
