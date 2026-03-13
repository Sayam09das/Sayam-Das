require('dotenv').config();

const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact.routes');

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://sayam-das.vercel.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger (optional but useful)
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | Origin: ${req.get("Origin")}`
  );
  next();
});

// Routes
app.use('/api', contactRoute);

// Health check
app.get('/', (req, res) => {
  res.json({
    status: "OK",
    message: "Sayam Portfolio Backend Running 🚀"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;