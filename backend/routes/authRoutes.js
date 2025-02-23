const express = require('express');
const { registerUser, loginUser, refreshToken } = require('../controllers/auth-controllers.js');

const router = express.Router();

router.get('/register', registerUser)
router.post('/login', loginUser);  // Handles user login
router.post('/refresh', refreshToken)

module.exports = router;
