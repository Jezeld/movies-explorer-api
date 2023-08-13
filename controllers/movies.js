const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badrequest');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/notfound');
const {
  NOT_FOUND_ID_ERROR,
  FORBIDDEN_ERROR,
  STATUS_OK,
  VALIDATION_ERROR,
  STATUS_OK_201,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ ...req.body, owner: _id })
    .then((movie) => {
      movie.populate('owner')
        .then(() => res.status(STATUS_OK_201).send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .populate('owner')
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) throw new NotFoundError(NOT_FOUND_ID_ERROR);
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      }
      movie.deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
