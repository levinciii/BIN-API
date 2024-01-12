const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true, 
    }
}, {timestamps: true})

// Static SignUp Method
userSchema.statics.signup = async function (email, password) {
    // Validation
    if (!email || !password) {
        throw Error('All fields cannot be empty!')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid Email!')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is weak!')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email is already existing!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// Static LogIn Method
userSchema.statics.login = async function(email, password) {
    // Validation
    if (!email || !password) {
        throw Error('All fields cannot be empty!')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email does not exist!')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password!')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)