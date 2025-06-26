const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const User = require('../models/User');

// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all assignments
router.get('/', async (req, res) => {
  const assignments = await Assignment.find()
    .populate('engineerId', 'name email')
    .populate('projectId', 'name');
  res.json(assignments);
});

// Get assignments for an engineer
router.get('/engineer/:engineerId', async (req, res) => {
  const assignments = await Assignment.find({ engineerId: req.params.engineerId })
    .populate('projectId', 'name startDate endDate');
  res.json(assignments);
});

// DELETE /api/assignments/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Assignment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
