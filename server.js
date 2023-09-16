require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
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

// Connect to DB  
mongoose.connect(process.env.MONGO_URI).then(() => {
    // Listen for requests
    bin.listen(process.env.PORT, () => {
        console.log('Connected to DB & Listening on port', process.env.PORT)
    })
}).catch((error) => {
    console.log(error)
})
