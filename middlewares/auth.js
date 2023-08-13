const jwt = require('jsonwebtoken');
const { SECRET_STRING } = require('../utils/config');

const UnauthorizedError = require('../errors/unauthorized');
const { UNAUTHORIZED_ERROR } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR));
    return;
  }

  const token = authorization.startsWith('Bearer ') ? authorization.replace('Bearer ', '') : authorization;

  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
