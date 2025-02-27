const express = require('express');
const { registerUser, loginUser, refreshToken, deleteUser } = require('../controllers/auth-controllers.js');

const router = express.Router();

router.get('/register', registerUser)
router.post('/login', loginUser);  // Handles user login
router.post('/refresh', refreshToken)
router.post('/delete', deleteUser)

module.exports = router;
