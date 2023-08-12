const router = require('express').Router();
const {
  createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  valCreateUser,
  valLogin,
} = require('../utils/celebrate');
const NotFoundError = require('../errors/notfound');

// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

router.post('/signup', valCreateUser, createUser);
router.post('/signin', valLogin, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (reg, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
