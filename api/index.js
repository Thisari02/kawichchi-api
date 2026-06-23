const express = require('express');
const connectDB = require('../db');
const app = express();

const userRoutes = require('../routes/userRoutes');

connectDB().catch((error) => {
  console.error('MongoDB connection failed:', error);
});

app.use(express.json());
app.use('/users', userRoutes);

module.exports = app;