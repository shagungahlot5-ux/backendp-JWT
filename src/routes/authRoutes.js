const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/roleCheck');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authMiddleware, signout);

// Manager's Task: Admin Only Page
router.get('/testing-test', authMiddleware, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin! Access to Testing Test Granted." });
});

module.exports = router;