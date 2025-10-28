// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// require('dotenv').config();

// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const farmerRoutes = require('./routes/farmer');

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests from this IP'
// });
// app.use('/api/', limiter);

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/farmer', farmerRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime()
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Route not found'
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(err.status || 500).json({
//     success: false,
//     error: err.message || 'Internal server error'
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\n=================================`);
//   console.log(`✓ Server running on port ${PORT}`);
//   console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`✓ Health check: http://localhost:${PORT}/health`);
//   console.log(`=================================\n`);
// });

// module.exports = app;


const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmer');

// ⭐ NEW: Import weather routes
const weatherRoutes = require('./routes/weather');
const chatRoutes = require('./routes/chatRoutes') ;
// const plantDiseaseRoute = require('./routes/plantDisease');




const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// ⭐ NEW: Separate rate limiter for weather API (more restrictive)
const weatherLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 requests per hour (conserve API calls)
  message: 'Too many weather requests. Please try again later.'
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);

// ⭐ NEW: Weather routes with rate limiting
app.use('/api/weather', weatherLimiter, weatherRoutes);

app.use('/api/chat', chatRoutes);

// Plant disease detection routes
// app.use('/api/plant', plantDiseaseRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log(`=================================\n`);
});

module.exports = app;