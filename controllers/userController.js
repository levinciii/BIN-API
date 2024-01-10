const User = require('../models/userModel')

// LogIn User
const loginUser = async (req, res) => {
    res.json({mssg: 'Login successful!'})
}

// SignUp User
const signupUser = async (reg, res) => {
    res.json({mssg: 'Signup successful!'})
}

module.exports = {
    loginUser,
    signupUser
}