/* eslint-disable max-len */
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badrequest');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/notfound');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ ...req.body, owner: _id })
    .then((movie) => {
      movie.populate('owner')
        .then(() => res.status(201).send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Фильм не найден');
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Запрещено удалять чужие фильмы');
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
