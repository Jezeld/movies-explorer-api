const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Используйте корректную ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Используйте корректную ссылку',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Используйте корректную ссылку',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
