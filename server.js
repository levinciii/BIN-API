require('dotenv').config()

const express = require('express')

// BIN-API
const bin = express()

// Middleware
bin.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
bin.get('/', (req, res) => {
    res.json({message: 'Welcome to BIN-API'})
})

// Listen for requests
bin.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})