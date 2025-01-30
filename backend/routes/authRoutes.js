const express = require('express');
const { registerUser, loginUser, logoutUser  } = require('../controllers/auth-controller');

const router = express.Router();

router.get('/register', registerUser)
router.post('/login', loginUser);  // Handles user login
router.post('/refresh', refreshToken)

module.exports = router;
