// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');
const engineersRouter = require('./routes/engineers');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/engineers', engineersRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Backend running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
