const router = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

const {
  valUpdateUser,
} = require('../utils/celebrate');

router.get('/me', getUserInfo);
router.patch('/me', valUpdateUser, updateUserInfo);

module.exports = router;
