const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authMiddleware, signout);

module.exports = router;