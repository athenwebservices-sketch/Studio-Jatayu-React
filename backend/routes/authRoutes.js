const express = require('express');
const router = express.Router();
const { requireApiKey } = require('../middleware/authMiddleware');
const { register, verifyOtp, login } = require('../controllers/authController');

router.post('/register', requireApiKey, register);
router.post('/verify-otp', requireApiKey, verifyOtp);
router.post('/login', requireApiKey, login);

module.exports = router;
