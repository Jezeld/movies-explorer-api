const jwt = require('jsonwebtoken');
const { SECRET_STRING } = require('../utils/config');

const UnauthorizedError = require('../errors/unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  const token = authorization.startsWith('Bearer ') ? authorization.replace('Bearer ', '') : authorization;

  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
