const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({mssg : 'GET all workouts'})
})

router.get('/:id', (req, res) => {
  res.json({mssg: 'GET  a single workout'})
})

router.post('/', (req, res) => {
  res.json({mssg: 'POST a new workout'})
})

module.exports = router