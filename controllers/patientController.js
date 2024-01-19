const Patient = require('../models/patientModel')
const mongoose = require('mongoose')

// GET all Patients
const getPatients = async (req, res) => {
    const user_id = req.user._id

    const patient = await Patient.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(patient)
}

// GET a single Patient
const getPatient = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Patient!'})
    }

    const patient = await Patient.findById(id)
    if (!patient){
        return res.status(404).json({error: 'No such Patient!'})
    }
    res.status(200).json(patient)
}

// POST a new Patient
const createPatient = async (req, res) => {
    const {
        name: {fname, mname, lname},
        birthdate,
        age,
        contact_details: {phone_num, email},
        appointment: {datetime}
    } = req.body
    
    let emptyFields = []

    if(!fname) {
        emptyFields.push('fname')
    }
    if(!mname) {
        emptyFields.push('mname')
    }
    if(!lname) {
        emptyFields.push('lname')
    }
    if(!birthdate) {
        emptyFields.push('birthdate')
    }
    if(!age) {
        emptyFields.push('age')
    }
    if(!phone_num) {
        emptyFields.push('phone_num')
    }
    if(!email) {
        emptyFields.push('email')
    }
    if(!datetime) {
        emptyFields.push('datetime')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        const patient = await Patient.create({
            name: {fname, mname, lname},    
            birthdate,
            age,
            contact_details: {phone_num, email},
            appointment: {datetime},
            user_id
        })
        res.status(200).json(patient)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a Patient
const deletePatient = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Patient!'})
    }

    const patient = await Patient.findOneAndDelete({_id: id})
    if (!patient){
        return res.status(404).json({error: 'No such Patient!'})
    }
    res.status(200).json(patient)
}

// UPDATE a Patient
const updatePatient = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Patient!'})
    }

    const patient = await Patient.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!patient){
        return res.status(404).json({error: 'No such Patient!'})
    }
    res.status(200).json(patient)
}

module.exports = {
    createPatient,
    getPatients,
    getPatient,
    deletePatient,
    updatePatient
}