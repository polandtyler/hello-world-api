const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Configure application for bodyParser()
// lets us grab data from body of a Post

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// set up port for server to listen on
const port = process.env.PORT || 3100

// connect to db
mongoose.connect('mongodb://localhost:27017/codealong')

// routes
const router = express.Router()

// routes prefixed with /api
app.use('/api', router)

// heartbeat
router.get('/heartbeat', function (req, res) {
  res.json({message: 'This API is aliiiiiiiiive!'})
})

app.listen(port)

// print friendly message to console
console.log('Server listening on port ' + port)
