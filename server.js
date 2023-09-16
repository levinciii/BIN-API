require('dotenv').config()

const express = require('express')
const patientRoutes = require('./routes/patient')

// BIN-API
const bin = express()

// Middleware
bin.use(express.json())

bin.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
bin.use('/bin/patients', patientRoutes)

// Listen for requests
bin.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})