const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all engineers
router.get('/engineers', async (req, res) => {
  const engineers = await User.find({ role: 'engineer' });
  res.json(engineers);
});

// Get manager list
router.get('/managers', async (req, res) => {
  const managers = await User.find({ role: 'manager' });
  res.json(managers);
});

router.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
