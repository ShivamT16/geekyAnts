const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('managerId', 'name email');
  res.json(projects);
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('managerId');
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: 'Project not found' });
  }
});

module.exports = router;
