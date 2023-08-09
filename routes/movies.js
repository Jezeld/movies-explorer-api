const router = require('express').Router();
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const {
  valCreateMovie,
  valDeleteMovie,
} = require('../utils/celebrate');

router.get('/', getMovies);
router.post('/', valCreateMovie, createMovie);
router.delete('/:id', valDeleteMovie, deleteMovie);

module.exports = router;
