const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 400,
  windowMS: 90000,
  message: 'Превышено количество запросов на сервер',
});

module.exports = limiter;
