const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { SECRET_STRING } = require('../utils/config');
const User = require('../models/user');
const BadRequestError = require('../errors/badrequest');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notfound');
const UnauthorizedError = require('../errors/unauthorized');
const {
  DUPLICATED_USER_ERROR,
  LOGIN_ERROR,
  NOT_FOUND_USER_ERROR,
  BAD_REQUEST_USER_ERROR,
  BAD_REQUEST_ERROR,
  ERROR_CODE_UNIQUE,
  STATUS_OK_201,
  STATUS_OK,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(STATUS_OK_201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(BAD_REQUEST_USER_ERROR));
        return;
      } if (err.code === ERROR_CODE_UNIQUE) {
        next(new ConflictError(DUPLICATED_USER_ERROR));
        return;
      }
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    // .then((user) => res.status(200).send(user))
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_ERROR);
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } if (err.code === ERROR_CODE_UNIQUE) {
        next(new ConflictError(DUPLICATED_USER_ERROR));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError(NOT_FOUND_USER_ERROR))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, SECRET_STRING, { expiresIn: '7d' });
            res.send({ token });
          } else {
            throw new UnauthorizedError(LOGIN_ERROR);
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUserInfo,
  updateUserInfo,
  login,
};
