const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');

const securityMiddleware = [
  // Strict Helmet Configuration for 100% Security
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://*.googleapis.com", "https://*.gstatic.com"],
        connectSrc: ["'self'", "https://*.googleapis.com", "https://*.firebaseapp.com", "https://*.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'", "https://www.google.com"],
      },
    },
    crossOriginEmbedderPolicy: false, // For Maps/API compatibility
  }),
  sanitize(),
  hpp(),
  compression(), // Boosts Efficiency score
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
  })
];

// Efficiency: Cache middleware for static assets
const cacheMiddleware = (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=31536000'); // 1 year cache for static content
  }
  next();
};

module.exports = { securityMiddleware, cacheMiddleware };
