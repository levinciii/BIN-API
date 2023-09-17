const express = require('express')
const Patient = require('../models/patientModel')

const router = express.Router()

// GET all patients
router.get('/', (req, res) => {
    res.json({mssg: 'GET all patients'})
})

// GET a single patient
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single patient'})
})

// POST a new patient
router.post('/', async (req, res) => {
    const {
        name: {fname, mname, lname},
        birthdate,
        age,
        contact_details: {phone_num, email},
        appointment: {date, time}
    } = req.body

    try {
        const patient = await Patient.create({
            name: {fname, mname, lname},
            birthdate,
            age,
            contact_details: {phone_num, email},
            appointment: {date, time}
        })
        res.status(200).json(patient)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a patient
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a patient'})
})

// UPDATE a patient
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a patient'})
})

module.exports = router