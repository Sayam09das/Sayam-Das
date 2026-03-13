require('dotenv').config();

const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact.routes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', contactRoute);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Sayam Portfolio Backend Running 🚀'
  });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

module.exports = app;