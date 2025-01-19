const express = require('express');
const { loginUser, signinUser,  } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/login', loginUser);  // Handles user login
router.get('/signin', signinUser); // Protected user profile

module.exports = router;
