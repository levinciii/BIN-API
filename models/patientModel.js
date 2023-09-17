const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PatientSchema = new Schema({
    name: {
      fname: {type: String, required: true},
      mname: {type: String, required: true},
      lname: {type: String, required: true},
    },
    birthdate: {type: String, required: true},
    age: {type: String, required: true},
    contact_details: {
      phone_num: {type: String, required: true},
      email: {type: String, required: true},
    },
    appointment: {
      date: {type: String, required: true},
      time: {type: String, required: true},
    }
}, {timestamps: true})

module.exports = mongoose.model('Patient', PatientSchema)