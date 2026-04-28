const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');

const securityMiddleware = [
  helmet(),
  sanitize(),
  hpp(), // Prevent HTTP Parameter Pollution
  compression(), // Gzip compression for efficiency
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per window
  })
];

module.exports = { securityMiddleware };
