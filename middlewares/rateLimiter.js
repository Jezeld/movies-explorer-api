const rateLimiter = require('express-rate-limit');
const { REGUESTS_ERROR } = require('../utils/config');

const limiter = rateLimiter({
  max: 400,
  windowMS: 90000,
  message: REGUESTS_ERROR,
});

module.exports = limiter;
