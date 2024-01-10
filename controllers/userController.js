const User = require('../models/userModel')

// LogIn User
const loginUser = async (reg, res) => {
    res.json({mssg: 'Login successful!'})
}

// SignUp User
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signUp(email, password)

        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    res.json({mssg: 'Signup successful!'})
}

module.exports = {
    loginUser,
    signupUser
}