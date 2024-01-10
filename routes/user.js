const express = require('express')

// Controller Functions
const { 
    loginUser, 
    signupUser 
} = require('../controllers/userController')

const router = express.Router()

// LogIn Route
router.post('/login', loginUser)

// SignUp Route
router.post('/signup', signupUser)

module.exports = router