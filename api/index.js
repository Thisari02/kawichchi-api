const express = require('express');
const connectDB = require('../db');
const cors = require('cors');
const app = express();

const userRoutes = require('../routes/userRoutes');
const studentRoutes = require('../routes/studentRoutes');
const projectRoutes = require('../routes/projectRoutes');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Connection middleware error:', error.message);
    res.status(503).json({ error: 'Database connection failed' });
  }
});

app.use('/users', userRoutes);
app.use('/students', studentRoutes);
app.use('/projects', projectRoutes);
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;