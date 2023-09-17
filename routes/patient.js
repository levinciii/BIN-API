const express = require('express')
const {
    createPatient, 
    getPatients,
    getPatient,
    deletePatient,
    updatePatient
} = require('../controllers/patientController')

const router = express.Router()

// GET all Patients
router.get('/', getPatients)

// GET a single Patient
router.get('/:id', getPatient)

// POST a new Patient
router.post('/', createPatient)

// DELETE a Patient
router.delete('/:id', deletePatient)

// UPDATE a Patient
router.patch('/:id', updatePatient)

module.exports = router