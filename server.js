const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Vehicle = require('./app/models/vehicle')

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

/*
middleware:
very useful for doing validations
we can log things from here or stop requests from continuing
in the event that the request is not safe
middleware to use for all requests:
*/
router.use(function (req, res, next) {
  console.log('FYI, there is some processing currently happening.')
  next()
})

// heartbeat
router.get('/heartbeat', function (req, res) {
  res.json({message: 'This API is aliiiiiiiiive!'})
})

router.route('/vehicles')
  .post(function (req, res) {
    var vehicle = new Vehicle() // new instance of a Vehicle
    vehicle.make = req.body.make
    vehicle.body = req.body.model
    vehicle.color = req.body.color

    console.log(req.body)
    vehicle.save(function (err) {
      if (err) {
        res.send(err)
      }
      res.json({message: 'Vehicle was successfully created!'})
    })
  })

  .get(function (req, res) {
    Vehicle.find(function (err, vehicles) {
      if (err) {
        res.send(err)
      }
      res.json(vehicles)
    })
  })

router.route('/vehicle/:vehicle_id')
  .get(function (req, res) {
    Vehicle.findById(req.params.vehicle_id, function (err, vehicle) {
      if (err) {
        res.send(err)
      }
      res.json(vehicle)
    })
  })

router.route('/vehicle/make/:make')
  .get(function (req, res) {
    Vehicle.find({ make: req.params.make }, function (err, vehicle) {
      if (err) {
        res.send(err)
      }
      res.json(vehicle)
    })
  })

router.route('/vehicle/color/:color')
  .get(function (req, res) {
    Vehicle.find({ make: req.params.color }, function (err, vehicle) {
      if (err) {
        res.send(err)
      }
      res.json(vehicle)
    })
  })

// fire up dat server
app.listen(port)

// print friendly message to console
console.log('Server listening on port ' + port)
