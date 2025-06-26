const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Project = require('./models/Project');
const Assignment = require('./models/Assignment');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany();
  await Project.deleteMany();
  await Assignment.deleteMany();

  const manager = await User.create({
  name: 'Alice Manager',
  email: 'manager@example.com',
  username: 'alice', // ✅ add this
  role: 'manager',
  });

  const engineer1 = await User.create({
  name: 'John Dev',
  email: 'john@example.com',
  username: 'john', // ✅ add this
  role: 'engineer',
  skills: ['React', 'Node.js'],
  seniority: 'mid',
  maxCapacity: 100,
  department: 'Frontend',
  });

  const engineer2 = await User.create({
  name: 'Sara Backend',
  email: 'sara@example.com',
  username: 'sara', // ✅ add this
  role: 'engineer',
  skills: ['Node.js', 'Python'],
  seniority: 'senior',
  maxCapacity: 50,
  department: 'Backend',
  });


  const project1 = await Project.create({
    name: 'Internal Tool',
    description: 'Dashboard for HR',
    requiredSkills: ['React'],
    teamSize: 2,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    managerId: manager._id,
  });

  await Assignment.create([
    {
      engineerId: engineer1._id,
      projectId: project1._id,
      allocationPercentage: 60,
      role: 'Developer',
      startDate: new Date(),
      endDate: new Date(Date.now() + 10 * 24 * 3600 * 1000),
    },
    {
      engineerId: engineer2._id,
      projectId: project1._id,
      allocationPercentage: 40,
      role: 'Tech Lead',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    },
  ]);

  console.log('✅ Seeded sample data!');
  process.exit();
})();
