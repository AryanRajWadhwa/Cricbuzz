const express = require('express');
const router = express.Router();
const { signup }= require('../controller/signup'); // Import your controller functions
const { login }= require('../controller/login'); // Import your controller functions

// Define routes for user registration and login
router.post('/signup', signup); // Route for user registration
router.post('/login', login); // Route for user login

module.exports = router;