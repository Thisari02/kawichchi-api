const express = require('express');
const connectDB = require('../db');
const cors = require('cors');
const app = express();

const userRoutes = require('../routes/userRoutes');
const studentRoutes = require('../routes/studentRoutes');

app.use(cors({
  origin: 'https://vite-project-woad-sigma.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

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
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;