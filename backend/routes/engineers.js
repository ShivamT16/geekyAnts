const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');

// Utility: calculate available capacity for an engineer
async function getAvailableCapacity(engineerId) {
  const engineer = await User.findById(engineerId);
  if (!engineer) return null;

  const today = new Date();
  const activeAssignments = await Assignment.find({
    engineerId: engineerId, // ✅ no ObjectId conversion needed
    startDate: { $lte: today },
    endDate: { $gte: today },
  });

  const totalAllocated = activeAssignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );

  return engineer.maxCapacity - totalAllocated;
}


// GET /api/engineers?skill=Node.js
router.get('/', async (req, res) => {
  try {
    const { skill } = req.query;
    if (!skill) return res.status(400).json({ error: 'Skill query required' });

    // Find engineers with this skill
    const engineers = await User.find({
      role: 'engineer',
      skills: skill,
    });

    // For each engineer, add availableCapacity field
    const engineersWithCapacity = await Promise.all(
      engineers.map(async (eng) => {
        const availableCapacity = await getAvailableCapacity(eng._id);
        return {
          _id: eng._id,
          name: eng.name,
          skills: eng.skills,
          seniority: eng.seniority,
          maxCapacity: eng.maxCapacity,
          department: eng.department,
          availableCapacity,
        };
      })
    );

    res.json(engineersWithCapacity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
