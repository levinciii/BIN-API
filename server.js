const express = require('express')

// BIN-API
const bin = express()

// Listen for requests
bin.listen(2609, () => {
    console.log('Listening on port 2609.')
})